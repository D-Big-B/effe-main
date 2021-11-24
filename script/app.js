import * as THREE from "three";

// ShaderFiles
import VertexShader from "./shaders/vertexShader.glsl";

import FragmentShader from "./shaders/fragmentShader.glsl";
import Color from "color";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new Color("#1d1d2f");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime() * 0.5;

  // passing time to fragment shader

  mainBg.material.uniforms.uTime.value = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

//cube

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

const mainBg = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.5, 2.5),
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: {
        value: 0,
      },
    },
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    transparent: true,
  })
);
mainBg.position.z = -1;
scene.add(mainBg);

tick();
