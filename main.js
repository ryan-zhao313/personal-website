import './style.css'

import * as THREE from 'three';

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

const material = new THREE.MeshStandardMaterial( {color: 0x2c4ff9});
const dodecahedron = new THREE.Mesh(geometry, material) ;

scene.add(dodecahedron);

// Light source which is brighter than my future
const pointLight =

// "Game Loop" to run constantly
function animate() {
  requestAnimationFrame(animate);

  // update the rotation for every animation frame
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.005;
  dodecahedron.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();








