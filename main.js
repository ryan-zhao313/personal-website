import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// There are multiple camera options https://threejs.org/docs/
// ProspectiveCamera(fov, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer renders the graphics
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Set camera position 30 units above the horizon of x=0 and y=0
camera.position.setZ(30);

// renderer.render(scene, camera);

// Three basic steps to add object to the scnene
// 1. create geometry with x, y, z points that make up the shape
// Three.JS has built-in geometry found here
// 2. Create material as wrapping paper
// 3. Create a mesh by combining geometry and material
const geometry = new THREE.DodecahedronGeometry(12, 1);

const material = new THREE.MeshNormalMaterial( {color: 0x2c4ff9, wireframe: true});
const dodecahedron = new THREE.Mesh(geometry, material) ;

scene.add(dodecahedron);

// Light source which is brighter than my future
const pointLight = new THREE.PointLight(0xffffff);
// move the light off center
pointLight.position.set(10, 10, 10);

// ambient light are like floodlights and they light up the whole room
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

// shows you where the light source is
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper, lightHelper);

// Instantiate a Orbit Control object to control our camera
const controls = new OrbitControls(camera, renderer.domElement);


const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
const star_material = new THREE.MeshStandardMaterial( {color: 0xffffff});
// function for creating stars randomly in the scene
function addStar() {
  const star = new THREE.Mesh(star_geometry, star_material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(225).fill().forEach(addStar);

// loading in textures
// const spaceTexture = new THREE.TextureLoader().load('img/space.jpg');
// scene.background = spaceTexture;

// const ryanTexture = new THREE.TextureLoader().load('img/profile_pic.jpg');
// const ryan = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new THREE.MeshBasicMaterial( {map: ryanTexture})
// );
// ryan.position.set(-10, -10, -10);
// scene.add(ryan);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.0002;
}

document.body.onscroll = moveCamera;

// "Game Loop" to run constantly
function animate() {
  requestAnimationFrame(animate);

  // update the rotation for every animation frame
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.005;
  dodecahedron.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();








