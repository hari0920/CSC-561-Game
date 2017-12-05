//Final Missile Command Game with Three.js
var zooming = true;
THREE.cache=true;
var Number_of_Missiles=100;
current_position = new THREE.Vector3();
Building_position =[];
var Anti_Missiles = new THREE.Object3D();
var score=0;
var ammo=20;
var level =1;
var Buildings_Destroyed=0;
// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Get the DOM element to attach to
const container = document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer({antialias:true});
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
camera.position.z=50;
const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);
//Raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);
//TERRAIN
//create and add a Plane
var planeTexture=new THREE.TextureLoader().load('building.jpg');
var geometry = new THREE.PlaneGeometry( 1000, 1000,32,32);
var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide,map:planeTexture} );
var plane = new THREE.Mesh( geometry, material );
plane .position.y=-100;
plane.rotateX(- Math.PI/2);
scene.add( plane );

//sky
var planeTexture = new THREE.TextureLoader().load('stars.jpg');
var geometry = new THREE.PlaneGeometry( 2000, 2000,32,32);
var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide,map:planeTexture} );
var plane = new THREE.Mesh( geometry, material );
plane.position.z=-500;
scene.add( plane );



//https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene
//var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
//var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
//var plane = new THREE.Mesh(geo, mat);
//plane.rotateX( - Math.PI / 2);
//scene.add(plane);
//light
var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
				dirLight.position.set( 0, 0, 1 ).normalize();
				scene.add( dirLight );
// create a point light
for(var i=-2;i<2;i++)
{
const pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = i*100;
pointLight.position.y = 50;
pointLight.position.z = 120;

// add to the scene
scene.add(pointLight);

}

// create the sphere's material
const sphereMaterial =
  new THREE.MeshLambertMaterial({
    color: 0xCC0000
  });

// Set up the sphere vars
const RADIUS = 10;
const SEGMENTS = 32;
const RINGS = 32;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!

const sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS),

  sphereMaterial);
//Anti-Ballistic Missiles
function AddAntiMissile(event)
{
  for(i=0;i<ammo;i++)
  {
  // Move the Sphere back in Z so we
  // can see it.
  //sphere.position.x=((mouse.x+1)/2) *window.innerWidth;
//  sphere.position.y=((mouse.y - 1) / 2) * window.innerHeight*-1;
// from https://stackoverflow.com/questions/36033879/three-js-object-follow-mouse-position
 var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
 vector.unproject(camera);
 var dir = vector.sub(camera.position).normalize();
 var distance = -camera.position.z / dir.z;
 var pos = camera.position.clone().add(dir.multiplyScalar(distance));
 sphere.position.copy(pos);
 //
  //sphere.position.x = (mouse.x)*window.innerWidth/2;
  //sphere.position.y = (mouse.y)*window.innerHeight/2;
  //sphere.position.z = 0;
  console.log(sphere.position);
  // Finally, add the sphere to the scene.
  Anti_Missiles.add(sphere);
  }
  scene.add(Anti_Missiles);
}
//Testing Model Load for Missile
//var loader=new THREE.JSONLoader();
var l= new THREE.OBJLoader();
var clonedMissile=new THREE.Object3D();
var Model=new THREE.Object3D();
l.load("missile\\AVMT300\\AVMT300.obj",
function(obj)
{
  for ( var i = 0; i < Number_of_Missiles; i ++ )
  {
    
    clonedMissile = obj.clone();
    var position= Math.random() *(5 + 5)-5;
    clonedMissile.position.set( 50*position, 200*i, 0);
    clonedMissile.rotateZ(Math.PI/2);
    Model.add(clonedMissile);
    //scene.add(clonedMissile);
  }
  scene.add(Model);
}
);
//Buildings
/*
l.load("building.obj",
  function (obj) {
    for (var i = -1; i < 2; i++) {
      clonedBuilding = obj.clone();
      clonedBuilding.scale.set(5,5,5);
      var texture = new THREE.TextureLoader().load("building.jpg");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      var material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,map: texture
      });
      clonedBuilding.traverse(function (child) {

        if (child instanceof THREE.Mesh) {

          child.material = material;

        }

      });
      clonedBuilding.position.set(i * 100, -100, 0);
      scene.add(clonedBuilding);
    }
    //scene.add(obj);
  }
);
*/
var Building_All = new THREE.Object3D();
 for (var i=-2;i<3;i++)
 {
   if(i%2==0)
   {var geometry = new THREE.BoxGeometry(50, 50, 50);
   var texture = new THREE.TextureLoader().load("missile-launcher.jpg");
   texture.wrapS = THREE.RepeatWrapping;
   texture.wrapT = THREE.RepeatWrapping;
   texture.repeat.set(1, 1);
   var material = new THREE.MeshBasicMaterial({
     side: THREE.DoubleSide,
     map: texture
   });
  }
  else
  {
    var geometry = new THREE.BoxGeometry(50, 100, 50);
    var texture = new THREE.TextureLoader().load("house.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    var material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture
    });
  }

//var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
Building = new THREE.Mesh(geometry, material);
Building.position.set(i * 150, -100, 0);
Building_position.push(Building.position);
//console.log(Building.position)
Building_All.add(Building);
}
scene.add(Building_All);
 //TEXT
 var Text;
l.load("title.obj",function(obj,materials){
  Text=obj;
  var material = materials;
  obj.position.set(-150,150,-10);
  scene.add(obj)})


//loader.load("three.js-master\\examples\\models\\animated\\horse.js",addModelToScene);

//var geometry = new THREE.BoxGeometry( 10, 10, 10 );
//var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );
//cube.position.x= 50;
//cube.position.y= 100;
//cube.position.z=-350;
//scene.add( cube );

var direction =new THREE.Vector3();
function MoveMissile()
{
  var speed=Math.random() * level * 3;
  
  for(i=0;i<Number_of_Missiles;i++)
  {
    current_position = Model.children[i].position;
    //calculate the direction vector and move along it.
    Model.children[i].position.y -= speed;
    //check collision too
    
    for(j=0;j<Building_position.length;j++)
    {
      if (current_position.distanceTo(Building_position[j]) < 1000)
      {
        if (current_position.distanceTo(Building_position[j]) < 25) {
          console.log("Collision");
          Building_All.children[j].position.y = 1000;
          Buildings_Destroyed += 1;
        }
        direction = new THREE.Vector3(100,-10,0).sub(current_position);
        //direction.multiplyScalar();
        console.log(direction);
        Model.children[i].position.x += direction.x;
        Model.children[i].position.y += direction.y;
        //Model.children[i].position.y -= Math.random() * speed;
        Model.children[i].position.z += direction.z;
      }
      else //off screen
      {
        Model.children[i].position.y -= speed;
      }
      
    }
    
    
  }
  
}

function addModelToScene(geometry,materials)
{
  //var material=new THREE.MeshFaceMaterial(materials);
  //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //console.log(geometry,materials);
  //var Model = new THREE.Mesh( geometry, materials );
  //Model.scale.set(10,10,10);
//  scene.add( Model );
}

 document.addEventListener('mousedown', onDocumentMouseDown, false); //for mouse click
 document.addEventListener('mousemove', onDocumentMouseMove, false); //for mouse move
function onDocumentMouseDown(event)
{
  console.log("Mouse Clicked");
  AddAntiMissile(); //create a sphere at that point
}
function onDocumentMouseMove(event) {
  //https://threejs.org/docs/#api/core/Raycaster
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //console.log(mouse);

}

function RaycasterUpdate()
{
  //from https://threejs.org/docs/#api/core/Raycaster
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(Building_All.children);
  //console.log(intersects);
  for (var i = 0; i < intersects.length; i++) {

    intersects[i].object.material.color.set(0xff0000);

  }

}
function update ()
{
  if(camera.position.z<600)
    {
      camera.position.z+=10;
            
    }
    else
    {
      scene.remove(Text);
      MoveMissile();
      //AntiMissile();
      RaycasterUpdate();
      //console.log(Building_All);
      //Model.position.y-=1;
      
      zooming=false;
    }
    
    //console.log(clonedMissile.position.x);

  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
