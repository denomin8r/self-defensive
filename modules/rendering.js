import * as THREE from "three";
import { updateMovement } from "./movement.js";

export const setupRendering = (
  scene,
  camera,
  renderer,
  controls,
  textureLoader,
  wallGroup,
  paintingGroup
) => {
  const clock = new THREE.Clock();
  
  // Create vectors for wall normals
  const wallNormals = {
    front: new THREE.Vector3(0, 0, 1),
    back: new THREE.Vector3(0, 0, -1),
    left: new THREE.Vector3(1, 0, 0),
    right: new THREE.Vector3(-1, 0, 0)
  };

  // Create a vector for camera's forward direction
  const cameraDirection = new THREE.Vector3();
  let lastWall = null;

  let render = function () {
    const delta = clock.getDelta();

    updateMovement(delta, controls, camera, wallGroup, paintingGroup);

    // Get camera's forward direction
    camera.getWorldDirection(cameraDirection);

    // Calculate dot products with each wall normal
    let maxDot = -1;
    let currentWall = null;

    for (const [wallName, normal] of Object.entries(wallNormals)) {
      const dot = -cameraDirection.dot(normal);
      if (dot > maxDot) {
        maxDot = dot;
        currentWall = wallName;
      }
    }

    if (currentWall != lastWall) {
      console.log("Facing: " + currentWall);
      lastWall = currentWall;
    }

    // Update strobe materials for each painting
    paintingGroup.children.forEach(painting => {
      if (
        painting.material instanceof THREE.ShaderMaterial && 
        painting.material.uniforms?.time) {
          painting.material.uniforms.time.value += delta;
        }
      });

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
