//Final Missile Command Game with Three.js
var level = 1;
THREE.Cache.enabled = true;
var score=0;
var Buildings_Destroyed = 0;
var game_over = false;
//var zooming = true;
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
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
  );
camera.position.z = 50;
const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);
//SOUND
//Create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
var sound = new THREE.Audio(listener);
var sound1 = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
song = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '06 Kashmir.mp3']
audioLoader.load(song[0], function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(false);
  sound.setVolume(0.5);
  sound.offset=5;
  sound.play();
});
//var explosion_sound;
//Load a sound and set it as the Audio object's buffer
audioLoader.load('explosion.mp3', function (buffer) {
  //explosion_sound=buffer;
  sound1.setBuffer(buffer);
  sound1.setLoop(false);
  sound1.setVolume(1.0);
  //sound1.play();
});

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

/////////////////////////////
var Number_of_Missiles=2*level;
Building_position =[];
var ammo=3*level;
var speed = Math.random() * level * 0.01*2;
var anti_target_array = [];
anti_target_array[0]=[];
anti_target_array[1]=[];
anti_target_array[2]=[];
var ammo_array = [0, 0, 0];
var empty = [0, 0, 0];
var missiles_launched = [0, 0, 0];
var spheres = [];
const threshold_missile=25;
var angle;
///////////////////////////////////////
//objects and three.js variables
var Anti_Missiles = new THREE.Object3D();
var Anti_Missiles = new THREE.Object3D();
var direction = new THREE.Vector3();
var destination = new THREE.Vector3();
var Antidestination = new THREE.Vector3();
//var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var mousepos = new THREE.Vector2();
var Building_All = new THREE.Object3D();
var clonedAntiMissile = new THREE.Object3D();
var AntiModel_left = new THREE.Object3D();
var AntiModel_center = new THREE.Object3D();
var AntiModel_right = new THREE.Object3D();
var AntiMissile_initial_position = [];
var position_of_antimissile = new THREE.Vector3();
var position_of_missile = new THREE.Vector3();


function init()
{
  sound.stop();
  audioLoader.load(song[level], function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
    sound.offset = 20;
    sound.play();
  });

  Number_of_Missiles = 2 * level;
  Buildings_Destroyed=0;
  //current_position = new THREE.Vector3();
  Building_position = [];
  //Anti_Missiles = new THREE.Object3D();
  ammo = 3 * level;
  anti_target_array = [];
  anti_target_array[0] = [];
  anti_target_array[1] = [];
  anti_target_array[2] = [];
  //const threshold_missile = 25;
  //direction = new THREE.Vector3();
  //destination = new THREE.Vector3();
  speed = Math.random() * level * 0.01*2;
  //Antidestination = new THREE.Vector3();
  //empty = [0, 0, 0];
  Building_All = new THREE.Object3D();
  ammo_array = [0, 0, 0];
  missiles_launched = [0, 0, 0];
  //spheres=[];
  //clonedAntiMissile = new THREE.Object3D();
  AntiModel_left = new THREE.Object3D();
  AntiModel_center = new THREE.Object3D();
  AntiModel_right = new THREE.Object3D();
  AntiMissile_initial_position = [];

  //m = new THREE.MTLLoader();
  //clonedMissile = new THREE.Object3D();
  //Model = new THREE.Object3D();
  m.load("missile\\AVMT300\\AVMT300.mtl", function (materials) {
    materials.preload();
   var l = new THREE.OBJLoader();
    l.setMaterials(materials);
    l.load("missile\\AVMT300\\AVMT300.obj",
      function (obj) {
        for (var i = 1; i < Number_of_Missiles + 1; i++) {

          clonedMissile = obj.clone();
          var position = Math.random() * (5 + 5) - 5;
          //var target= Math.random()*5;
          clonedMissile.position.set(50 * position, 200 * i, 0);
          clonedMissile.rotateZ(Math.PI / 2);
          //clonedMissile.scale.set(5,5,5);
          Model.add(clonedMissile);
          //scene.add(clonedMissile);
        }
        scene.add(Model);
      }
    );

  });
  //Building
  for (var i = -2; i < 3; i++) {
    if (i % 2 == 0) {
      geometry = new THREE.BoxGeometry(50, 50, 50);
      texture = new THREE.TextureLoader().load("missile-launcher.jpg");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture
      });
    }
    else {
      geometry = new THREE.BoxGeometry(50, 100, 50);
      texture = new THREE.TextureLoader().load("house.jpg");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      material = new THREE.MeshLambertMaterial({
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
  //Anti-Missile

  m.load("hellfire\\agm-114HellFire\\Files\\AGM-114HellFire.mtl", function (materials) {
    materials.preload();
    var l = new THREE.OBJLoader();
    l.setMaterials(materials);
    l.load("hellfire\\agm-114HellFire\\Files\\AGM-114HellFire.obj",
      function (obj) {
        for (var i = 1; i < ammo + 1; i++) {
          clonedAntiMissile = obj.clone();
          //var position = Math.random() * (5 + 5) - 5;
          //var target= Math.random()*5;
          clonedAntiMissile.scale.set(5,5,5);
          clonedAntiMissile.position.x = Building_position[(i % 3) * 2].x + Math.floor(Math.random() * 10);
          clonedAntiMissile.position.y = -75;
          clonedAntiMissile.position.z = 0;
          ammo_array[(i % 3)] += 1;
          anti_target_array[(i % 3)].push([0, 0, 0]);
          //console.log(clonedAntiMissile.position);
          AntiMissile_initial_position[(i % 3)] = ([clonedAntiMissile.position.x, -75, 0]);
          clonedAntiMissile.rotateY(Math.PI);
          clonedAntiMissile.rotateX(-Math.PI / 2);
          if ((i % 3) == 0)
            AntiModel_left.add(clonedAntiMissile);
          if ((i % 3) == 1)
            AntiModel_center.add(clonedAntiMissile);
          if ((i % 3) == 2)
            AntiModel_right.add(clonedAntiMissile);
          //scene.add(clonedMissile);
        }
        scene.add(AntiModel_left);
        scene.add(AntiModel_center);
        scene.add(AntiModel_right);
      }
    );

  });

}//end init

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

//game over
var planeTexture = new THREE.TextureLoader().load('gameover.png');
var geometry = new THREE.PlaneGeometry(800, 800, 64, 64);
var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: planeTexture });
var Gplane = new THREE.Mesh(geometry, material);
Gplane.position.z = 50;
  //scene.add(Gplane);

//https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene
//light

var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
				dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );

// create a point light
for(var i=-1;i<1;i++)
{
const pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = i*200;
pointLight.position.y = 100;
pointLight.position.z = 120;

// add to the scene
scene.add(pointLight);

}
const pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 0;
pointLight.position.y = 300;
pointLight.position.z = 20;

// add to the scene
scene.add(pointLight);

//Testing Model Load for Missile
//var loader=new THREE.JSONLoader();
var m=new THREE.MTLLoader();
//var l= new THREE.OBJLoader();
var clonedMissile=new THREE.Object3D();
var Model=new THREE.Object3D();
m.load("missile\\AVMT300\\AVMT300.mtl",function(materials)
{
  materials.preload();
  var l = new THREE.OBJLoader();
  //var clonedMissile = new THREE.Object3D();
  //var Model = new THREE.Object3D();
  l.setMaterials(materials);
  l.load("missile\\AVMT300\\AVMT300.obj",
    function (obj) {
      for (var i = 1; i < Number_of_Missiles + 1; i++) {

        clonedMissile = obj.clone();
        var position = Math.random() * (5 + 5) - 5;
        //var target= Math.random()*5;
        clonedMissile.position.set(50 * position, 75 * i, 0);
        clonedMissile.rotateZ(Math.PI / 2);
        Model.add(clonedMissile);
        //scene.add(clonedMissile);
      }
      scene.add(Model);
    }
  );

});

//TEXT
//m = new THREE.MTLLoader();
var Text;
m.load("title.mtl", function (materials) 
{
  materials.preload();
  var l = new THREE.OBJLoader();
  l.setMaterials(materials);
  l.load("title.obj",function (obj) 
  {
    Text = obj;
    obj.position.set(-150, 150, -10);
    scene.add(obj);
  }
);
}
);

var win=new THREE.Object3D();
m.load("win.mtl", function (materials) {
  materials.preload();
  var l = new THREE.OBJLoader();
  l.setMaterials(materials);
  l.load("win.obj", function (obj) {
    win = obj;
    obj.position.set(-150, -100, -20);
    obj.scale.set(30,30,30);
    //scene.add(obj);
  }
  );
}
);

//Building
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

//Anti-Missile

m.load("hellfire\\agm-114HellFire\\Files\\AGM-114HellFire.mtl", function (materials) {
  materials.preload();
  var l = new THREE.OBJLoader();
  l.setMaterials(materials);
  l.load("hellfire\\agm-114HellFire\\Files\\AGM-114HellFire.obj",
    function (obj) {
      for (var i = 1; i < ammo + 1; i++) {
        clonedAntiMissile = obj.clone();
        //var position = Math.random() * (5 + 5) - 5;
        //var target= Math.random()*5;
        clonedAntiMissile.scale.set(4, 4, 4);
        clonedAntiMissile.position.x = Building_position[(i % 3) * 2].x + Math.floor(Math.random() * 10);
        clonedAntiMissile.position.y = -75;
        clonedAntiMissile.position.z = 0;
        ammo_array[(i % 3)] += 1;
        anti_target_array[(i % 3)].push([0, 0, 0]);
        //console.log(clonedAntiMissile.position);
        AntiMissile_initial_position[(i % 3)] = ([clonedAntiMissile.position.x, -75, 0]);
        clonedAntiMissile.rotateY(Math.PI);
        clonedAntiMissile.rotateX(-Math.PI / 2);
        if ((i % 3) == 0)
          AntiModel_left.add(clonedAntiMissile);
        if ((i % 3) == 1)
          AntiModel_center.add(clonedAntiMissile);
        if ((i % 3) == 2)
          AntiModel_right.add(clonedAntiMissile);
        //scene.add(clonedMissile);
      }
      scene.add(AntiModel_left);
      scene.add(AntiModel_center);
      scene.add(AntiModel_right);
    }
  );

});

//spaceship
var ship=new THREE.Object3D();
var l = new THREE.OBJLoader();
l.load("hellfire\\agm-114HellFire\\Files\\AGM-114HellFire.obj", function (obj) 
{
    ship = obj;
    obj.position.set(-600,150, 0);
    obj.scale.set(20,20,20);
    //obj.rotateZ(Math.PI/2);
    //Model.add(ship);
    //scene.add(ship);
  }
  );

function UpdateTarget(i) {
  //return (build[Math.floor(Math.random() * 2)]);
  return Math.floor(Math.random() * (Building_position.length)); //random 0 to 5
  
}

function UpdateAntiTarget(i,missile_launch_number,mousepos)
{
  //i is 0,1 or 2 based on the battery
  //missile_launch_number is from 0 to ammo/3, missile within battery
  var battery_targets=anti_target_array[i]; //targets for the battery
  var equal=battery_targets[missile_launch_number].every(function (v, j) { return v === empty[j]})
  if(equal) //empty
  {
    battery_targets[missile_launch_number][0] = mousepos.x;
    battery_targets[missile_launch_number][1] = mousepos.y;
    battery_targets[missile_launch_number][2] = 0;
    Antidestination.x = mousepos.x;
    Antidestination.y = mousepos.y;
    Antidestination.z = 0;
    return Antidestination;
  }
  else //already has value
  {
    Antidestination.x = battery_targets[missile_launch_number][0];
    Antidestination.y = battery_targets[missile_launch_number][1];
    Antidestination.z = 0;
    return Antidestination; 
  //Antidestination.x = Math.max((i%5),Math.random()*(5+5)-5);
  //Antidestination.y = 300;
  //Antidestination.z =  0;
  //return Antidestination;
  
  }
}
//var random=false;
//var prev_position = new THREE.Vector3();
function MoveMissile()
{
  
  //workflow is as follows.for each missile, move it towards its target, check for collision.
  for(i=0;i<Model.children.length;i++)//for every missile
  {
    
    //move towards target
    current_position = Model.children[i].position;
    prev_position=current_position.clone();
    //calculate the direction vector and move along it.
    
    var j = UpdateTarget(); //returns one of the buildings
    if(current_position.y>Building_position[j].y)
    {
      if(current_position.distanceToSquared(Building_position[j]) < 200*200) //if on screen
      {
      //calculate direction vector to target
      destination = Building_position[j].clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed);
      direction.normalize();
      //console.log(direction);
      Model.children[i].position.x += direction.x;
      Model.children[i].position.y += direction.y;
      Model.children[i].position.z += direction.z;
      Model.children[i].rotation.y += delta;//clock.getDelta();
      //var linematerial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
      //var linegeometry = new THREE.Geometry();
      //linegeometry.vertices.push(prev_position);
      //linegeometry.vertices.push(current_position);
      //linegeometry.vertices.push(destination);
      //scene.add(new THREE.Line(linegeometry,linematerial));
      }
      else //off screen
      {
        Model.children[i].position.y -= 0.5*level*0.5; // just move down 
      }
    }
    else //off screen
    {
      Model.children[i].position.y -= 0.5*level*0.5; // just move down 
    }
  //check collision too
  current_position = Model.children[i].position;
  checkCollisionBuilding(current_position);
  }//end for every missile
}//end move missile

function removeAntiMissile(k,i)
{
  if (k == 0) { AntiModel_left.remove(AntiModel_left.children[j]); }
  if (k == 1) { AntiModel_center.remove(AntiModel_center.children[j]); }
  if (k == 2) { AntiModel_right.remove(AntiModel_right.children[j]); }
  anti_target_array[k].splice(i, 1);
  missiles_launched[k]--;
}
function MoveAntiMissile()
{
  for(k=0;k<missiles_launched.length;k++) //for every battery
  {
    for (i = 0; i < missiles_launched[k]; i++)//for every missile of that battery, launched
    { //i range will be between 0 and ammo/3.
      if(k==0)//left
      {//move towards target
      current_position = AntiModel_left.children[i].position;
      //calculate the direction vector and move along it.
      var j = UpdateAntiTarget(0,i,mousepos); //returns Target for the missile 
      if (current_position.distanceToSquared(j) <25) //check for detonation
        {
          AntiModel_left.remove(AntiModel_left.children[i]);
          anti_target_array[0].splice(i, 1);
          missiles_launched[k]--;
          explosion(current_position);
          return;
        }

      //if (current_position.y > Building_position[j].y) {
      destination = j.clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed*2);
      direction.normalize();
      angle = current_position.angleTo(j);
      //console.log(direction);
      AntiModel_left.children[i].position.x += direction.x;
      AntiModel_left.children[i].position.y += direction.y;
      AntiModel_left.children[i].position.z += direction.z;
      //AntiModel_left.children[i].rotation.y = angle;
      }
      if(k==1)
      {
        //move towards target
        current_position = AntiModel_center.children[i].position;
        //calculate the direction vector and move along it.
        var j = UpdateAntiTarget(1,i,mousepos); //returns Target for the missile 
        //if (current_position.y > Building_position[j].y) {
        if (current_position.distanceToSquared(j) < 25) //check for detonation
        {
          AntiModel_center.remove(AntiModel_center.children[i]);
          anti_target_array[1].splice(i, 1);
          missiles_launched[k]--;
          explosion(current_position);
          return;
        }

        destination = j.clone();
        direction = destination.sub(current_position);
        direction.multiplyScalar(speed*2);
        direction.normalize();
        angle = current_position.angleTo(j);
        //console.log(direction);
        AntiModel_center.children[i].position.x += direction.x;
        AntiModel_center.children[i].position.y += direction.y;
        AntiModel_center.children[i].position.z += direction.z;
        //AntiModel_center.children[i].rotation.y = angle;

      }
      if(k==2)
      {
        //move towards target
        current_position = AntiModel_right.children[i].position;
        //calculate the direction vector and move along it.
        var j = UpdateAntiTarget(2,i,mousepos); //returns Target for the missile 
        if (current_position.distanceToSquared(j) < 25) //check for detonation
        {
          AntiModel_right.remove(AntiModel_right.children[i]);
          anti_target_array[2].splice(i, 1);
          missiles_launched[k]--;
          explosion(current_position);
          return;
        }

        //if (current_position.y > Building_position[j].y) {
        destination = j.clone();
        direction = destination.sub(current_position);
        direction.multiplyScalar(speed*2);
        direction.normalize();
        angle = current_position.angleTo(j);
        //console.log(direction);
        AntiModel_right.children[i].position.x += direction.x;
        AntiModel_right.children[i].position.y += direction.y;
        AntiModel_right.children[i].position.z += direction.z;
        //AntiModel_right.children[i].rotation.y = angle;
      }
    }//end for all missiles of that battery
  }//end for battery
}//end move anti missile


function LaunchAntiMissile(keypress,mousepos) 
{
  //workflow is as follows.for each missile, move it towards mouse, check for collision with missile.
  if(keypress==65) //left missile battery selected
  {
    if(ammo_array[0]>0) // it has missiles left
    {
      //move towards target
      current_position = AntiModel_left.children[missiles_launched[0]].position;
      //calculate the direction vector and move along it.
      var j = UpdateAntiTarget(0,missiles_launched[0],mousepos); //returns Target for the missile 


      //if (current_position.y > Building_position[j].y) {
      destination = j.clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed*2);
      direction.normalize();
      angle= current_position.angleTo(j);
      //console.log(direction);
      AntiModel_left.children[missiles_launched[0]].position.x += direction.x;
      AntiModel_left.children[missiles_launched[0]].position.y += direction.y;
      AntiModel_left.children[missiles_launched[0]].position.z += direction.z;
      //AntiModel_left.children[missiles_launched[0]].rotation.x = angle * Math.PI/180;
      //AntiModel_left.children[missiles_launched[0]].rotation.z = angle * Math.PI / 180;
      //AntiModel_left.children[missiles_launched[0]].rotation.z = angle * Math.PI / 180;
      //AntiModel_left.children[missiles_launched[0]].rotation.y = angle;
      missiles_launched[0]+=1;
      ammo_array[0]--;
      //check collision too
      //current_position = Model.children[i].position;
      //checkCollisionMissile(current_position);
    }//end for every missile
  }
  if (keypress == 83) //left missile battery selected
  {
    if (ammo_array[1] > 0) // it has missiles left
    {
      //move towards target
      current_position = AntiModel_center.children[missiles_launched[1]].position;
      //calculate the direction vector and move along it.
      var j = UpdateAntiTarget(1,missiles_launched[1],mousepos); //returns Target for the missile 
      //if (current_position.y > Building_position[j].y) {
      destination = j.clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed*2);
      direction.normalize();
      angle = current_position.angleTo(j);
      //console.log(direction);
      AntiModel_center.children[missiles_launched[1]].position.x += direction.x;
      AntiModel_center.children[missiles_launched[1]].position.y += direction.y;
      AntiModel_center.children[missiles_launched[1]].position.z += direction.z;
      //AntiModel_center.children[missiles_launched[1]].rotation.y = angle-Math.PI/4 ;//* Math.PI / 180;
      missiles_launched[1] += 1;
      ammo_array[1] --;
      //check collision too
      //current_position = Model.children[i].position;
      //checkCollisionMissile(current_position);
    }//end for every missile
  }
  if (keypress == 68) //left missile battery selected
  {
    if (ammo_array[2] >0) // it has missiles left
    {
      //move towards target
      current_position = AntiModel_right.children[missiles_launched[2]].position;
      //calculate the direction vector and move along it.
      var j = UpdateAntiTarget(2,missiles_launched[2],mousepos); //returns Target for the missile 
      //if (current_position.y > Building_position[j].y) {
      destination = j.clone();
      direction = destination.sub(current_position);
      direction.multiplyScalar(speed*2);
      direction.normalize();
      angle = current_position.angleTo(j);
      //console.log(direction);
      AntiModel_right.children[missiles_launched[2]].position.x += direction.x;
      AntiModel_right.children[missiles_launched[2]].position.y += direction.y;
      AntiModel_right.children[missiles_launched[2]].position.z += direction.z;
      //AntiModel_right.children[missiles_launched[2]].rotation.y = angle ;//* Math.PI / 180;
      missiles_launched[2] += 1;
      ammo_array[2] --;
      //check collision too
      //current_position = Model.children[i].position;
      //checkCollisionMissile(current_position);
    }//end for every missile
  }
}//end move antimissile

function checkCollisionBuilding(current_position)
{
  for (k = 0; k < Building_position.length; k++) //for every building
  {
    if (current_position.distanceToSquared(Building_position[k]) < 50*50) {
      console.log("Collision");
     // Building_All.children[k].position.y = -2000;
       //Building_All.children[k].position.z = -2;
      //        Model.children[i].position.y -= 550; //destroy missile
      if (Math.abs(Building_position[k].x)==150) {
        console.log("Building Hit");
        Buildings_Destroyed += 1;
      }
      else
      {
        console.log("Battery Hit");
        if(Building_position[k].x==-300)
        {
          scene.remove(AntiModel_left);
        }
        if (Building_position[k].x == 0) {
          scene.remove(AntiModel_center);
        }
        if (Building_position[k].x == 300) {
          scene.remove(AntiModel_right);
        }
      }
      if (Buildings_Destroyed == 2) {
        console.log("GAME OVER!!");
        game_over = true;
      }
      explosion(Building_position[k]);
      Building_position.splice(k, 1);
      Building_All.remove(Building_All.children[k]); //destroy building
      Model.remove(Model.children[i]); //destroy missile
      score-=500;
    }
  }//end collision check 
}

function checkCollisionMissiles()
{
  for (i = 0; i < Model.children.length; i++) //for every incoming missile
  {
    position_of_missile=Model.children[i].position;
    if(position_of_missile.y<=-100) //below plane
    {
      Model.remove(Model.children[i]);
    }
    else if(position_of_missile.y>500)
    {
      continue;
    }
    else //they are on screen
    {
      //compare with launched missiles from each battery
      for(k=0;k<missiles_launched.length;k++)
      {  
        for(j=0;j< missiles_launched[k];j++)
        {
          if (k == 0) { position_of_antimissile = AntiModel_left.children[j].position;}
          if (k == 1) { position_of_antimissile = AntiModel_center.children[j].position; }
          if (k == 2) { position_of_antimissile = AntiModel_right.children[j].position; }
          //now we have the position of the missile and the anti-missile
          if(position_of_missile.distanceToSquared(position_of_antimissile)<50*50)
          {
             console.log("Collision of Missiles!");      
             Model.remove(Model.children[i]); //remove the missile
             removeAntiMissile(k,j); //remove the ABM
             explosion(position_of_antimissile);
             score+=100*level;
             //console.log(score);
          }
        }
      }
    }
  }
}

function checkCollisionShip()
{
  position_of_missile = ship.position;
  if (position_of_missile.y <= -100) //below plane
  {
    scene.remove(ship);
  }
  else if (position_of_missile.y > 500) {
    return;
  }
  else //they are on screen
  {
    //compare with launched missiles from each battery
     for (k = 0; k < missiles_launched.length; k++) {
       for (j = 0; j < missiles_launched[k]; j++) {
         if (k == 0) { position_of_antimissile = AntiModel_left.children[j].position; }
         if (k == 1) { position_of_antimissile = AntiModel_center.children[j].position; }
         if (k == 2) { position_of_antimissile = AntiModel_right.children[j].position; }
         //now we have the position of the missile and the anti-missile
         if (position_of_missile.distanceToSquared(position_of_antimissile) < 50 * 50) {
           console.log("Collision of Ship!");
           ship.position.x-=500;
           scene.remove(ship); //remove the missile
           removeAntiMissile(k, j); //remove the ABM
           explosion(position_of_antimissile);
           score += 300;
           bonus=false; //reset bonus
           //console.log(score);
          }
        }
      }
    }
}
function explosion(current_position)
{
  sound1.play();
  var geometry = new THREE.SphereGeometry(25, 32, 32);
  var material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
  var explosion = new THREE.Mesh(geometry, material);
  explosion.position.copy(current_position);
  explosion.rotation.y+=2;
  spheres=explosion;
  scene.add(spheres);
  
}

 document.addEventListener('mousedown', onDocumentMouseDown, false); //for mouse click
 document.addEventListener('mousemove', onDocumentMouseMove, false); //for mouse move
 document.addEventListener('resize', onWindowResize, false);
 document.addEventListener("keydown",onDocumentKeyDown,false);
 //
 
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
  //MoveAntiMissile(); //Move Anti Missile
  //Detonate();
}
function onDocumentMouseMove(event) {
  //https://threejs.org/docs/#api/core/Raycaster
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  mousepos.x = pos.x;
  mousepos.y = pos.y;

  //console.log(mouse);
  
 // console.log(mousepos);

}
function onDocumentKeyDown(event)
{
  var keycode=event.which;
  if(keycode==65)
  {
    //console.log(keycode);
    LaunchAntiMissile(65,mousepos);
  }
  if (keycode == 83) {
    LaunchAntiMissile(83,mousepos);
  }
  if (keycode == 68) {
    LaunchAntiMissile(68,mousepos);
  }
  if(keycode == 82) //reload 
  {
    level=1;
    game_over=false;
    //init();
    location.reload();
  }
}
/*
function RaycasterUpdate()
{
  //from https://threejs.org/docs/#api/core/Raycaster
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(Building_All.children);
  //console.log(intersects);
  for (var i = 0; i < intersects.length; i++) 
  {

    intersects[i].object.material.color.set(0xff0000);

  }

}
*/
  
var clock=new THREE.Clock();
//using stats.js
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
stats.domElement.style.position='absolute';
stats.domElement.style.left = '50px';
stats.domElement.style.top = '50px';

document.body.appendChild(stats.dom);
var bonus=false;
var delta;
function update 
()
{
  delta=clock.getDelta();
  stats.begin();
  document.getElementById("info").innerHTML = "Level: "+level+" Score: "+ score
  + " Ammo Left: " + ammo_array[0]
  + " Ammo Center: " + ammo_array[1]
  + " Ammo Right: " + ammo_array[2]
  + "Missiles Left: " + Model.children.length;
  if(camera.position.z<600)
    {
      scene.remove(spheres);
      camera.position.z+=5;
                 
    }
    else
    {
      //camera.position.z-=4;
      //scene.remove(Text);
      if(!game_over)
      {
        //console.log(clock.oldTime);
        scene.remove(spheres);
        MoveMissile();
        MoveAntiMissile();
        checkCollisionMissiles();
        if((score>=400*level) && (bonus==false))
        {
          scene.add(ship);
          bonus=true;
        }
        if(bonus==true)
        {
          ship.position.x += level*0.5;//Math.random() * (5 + 5) - 5;
          checkCollisionShip();
        }
        if(Model.children.length==0)
        {
          
            //var new_level=level ++;
            level++;
            scene.remove(Model);
            scene.remove(Building_All);
            scene.remove(AntiModel_left);
            scene.remove(AntiModel_center);
            scene.remove(AntiModel_right);
            init();
            camera.position.z = 200;
        }
      }
        //RaycasterUpdate();
        //console.log(Building_All);
        //Model.position.y-=1;
      else 
      {
        scene.add(Gplane);
        camera.rotation.z+=0.002;
      }
      //zooming=false;
    }
    
    //console.log(clonedMissile.position.x);

  // Draw!
  renderer.render(scene, camera);
  stats.end();
  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
