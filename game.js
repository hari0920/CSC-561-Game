// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Get the DOM element to attach to
const container =
    document.querySelector('#container');

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

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);
//TERRAIN
//create and add a Plane
var planeTexture=THREE.ImageUtils.loadTexture('missile_plane_texture.jpg');
var geometry = new THREE.PlaneGeometry( 1000, 1000,32,32);
var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide,map:planeTexture} );
var plane = new THREE.Mesh( geometry, material );
plane .position.y=-100;
plane.rotateX(- Math.PI/2);
scene.add( plane );

//sky
var planeTexture=THREE.ImageUtils.loadTexture('stars.jpg');
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
const pointLight =  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 120;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

// create the sphere's material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// Set up the sphere vars
const RADIUS = 50;
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

// Move the Sphere back in Z so we
// can see it.
sphere.position.x = 100;
sphere.position.y = 120;
sphere.position.z = -400;

// Finally, add the sphere to the scene.
//scene.add(sphere);

//Testing Model Load for Missile
//var loader=new THREE.JSONLoader();
var l= new THREE.OBJLoader();
var clonedMissile=new THREE.Object3D();
l.load("missile\\AVMT300\\AVMT300.obj",
function(obj)
{
  for ( var i = -10; i < 10; i ++ )
  {
    clonedMissile = obj.clone();
    clonedMissile.position.set( i * 100, 0, 0);
    scene.add(clonedMissile);
  }
  //scene.add(obj);
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

 for (var i=-1;i<2;i++)
 {
   var geometry = new THREE.BoxGeometry(100, 100, 50);
   var texture = new THREE.TextureLoader().load("building.jpg");
   texture.wrapS = THREE.RepeatWrapping;
   texture.wrapT = THREE.RepeatWrapping;
   texture.repeat.set(4, 4);
   var material = new THREE.MeshBasicMaterial({
     side: THREE.DoubleSide,
     map: texture
   });

//var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(i * 200, -100, 0);
scene.add(cube);
 }
//TEXT
l.load("title.obj",function(obj,materials){
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

function addModelToScene(geometry,materials)
{
  //var material=new THREE.MeshFaceMaterial(materials);
  //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //console.log(geometry,materials);
  //var Model = new THREE.Mesh( geometry, materials );
  //Model.scale.set(10,10,10);
//  scene.add( Model );
}
function update ()
{
  if(camera.position.z<500)
    {
      camera.position.z+=10
    }

  //console.log(clonedMissile);
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
