//Final Missile Command Game with Three.js
var zooming = true;
THREE.Cache.enabled = true;
var Number_of_Missiles=100;
current_position = new THREE.Vector3();
Building_position =[];
var Anti_Missiles = new THREE.Object3D();
var score=0;
var ammo=20;
var level =1;
var Buildings_Destroyed=0;
var game_over=false;
// Set the scene size.
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// Set some camera attributes.
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;

// Get the DOM element to attach to
const container = document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer({antialias:true});
var camera =
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
    const sphere = new THREE.Mesh(

      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

      sphereMaterial);
 sphere.position.copy(pos);
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
  for ( var i = 1; i < Number_of_Missiles+1; i ++ )
  {
    
    clonedMissile = obj.clone();
    var position= Math.random() *(5 + 5)-5;
    //var target= Math.random()*5;
    clonedMissile.position.set( 50*position, 75*i, 0);
    clonedMissile.rotateZ(Math.PI/2);
    Model.add(clonedMissile);
    //scene.add(clonedMissile);
  }
  scene.add(Model);
}
);

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
  scene.add(obj);});

//var build=[1,3,1];
var direction =new THREE.Vector3();
var destination = new THREE.Vector3();
var speed = Math.random() * level * 0.01;
function UpdateTarget(i) {
  //return (build[Math.floor(Math.random() * 2)]);
  return Math.floor(Math.random() * (Building_position.length)); //random 0 to 5
  
}
function MoveMissile()
{
  //workflow is as follows.for each missile, move it towards its target, check for collision.
  for(i=0;i<Model.children.length;i++)//for every missile
  {
    //move towards target
    current_position = Model.children[i].position;
    //calculate the direction vector and move along it.
    
    var j = UpdateTarget(); //returns one of the buildings
    if(current_position.y>Building_position[j].y)
    {
      if(current_position.distanceTo(Building_position[j]) < 175) //if on screen
      {
      //calculate direction vector to target
      destination = Building_position[j].clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed);
      //console.log(direction);
      Model.children[i].position.x += direction.x;
      Model.children[i].position.y += direction.y;
      Model.children[i].position.z += direction.z;
      }
      else //off screen
      {
        Model.children[i].position.y -= 1; // just move down 
      }
    }
    else //off screen
    {
      Model.children[i].position.y -= 1; // just move down 
    }
  //check collision too
  current_position = Model.children[i].position;
  checkCollisionBuilding(current_position);
  }//end for every missile
}//end move missile

function checkCollisionBuilding(current_position)
{
  for (k = 0; k < Building_position.length; k++) //for every building
  {
    if (current_position.distanceTo(Building_position[k]) < 50) {
      console.log("Collision");
     // Building_All.children[k].position.y = -2000;
      //Building_All.children[k].position.z = -2;
      //        Model.children[i].position.y -= 550; //destroy missile
      if (Math.abs(Building_position[k].x)==150) {
        console.log("Building Hit");
        Buildings_Destroyed += 1;
      }
      if (Buildings_Destroyed == 2) {
        console.log("GAME OVER!!");
        game_over = true;
      }
      Building_position.splice(k, 1);
      Building_All.remove(Building_All.children[k]); //destroy building
      Model.remove(Model.children[i]);
    }
  }//end collision check 
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
 document.addEventListener('resize', onWindowResize, false);
 function onWindowResize(event)
 {
   console.log("Resize");
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth,window.innerHeight);
 }
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
      if(!game_over)
      {
        MoveMissile();
      //AntiMissile();
      RaycasterUpdate();
      //console.log(Building_All);
      //Model.position.y-=1;
      }
      else
      {
        camera.rotation.z+=0.001;
      }
      //zooming=false;
    }
    
    //console.log(clonedMissile.position.x);

  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
