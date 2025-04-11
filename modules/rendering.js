import * as THREE from "three";
import { updateMovement } from "./movement.js";
import { placePaintings } from "./paintings.js";
import { wallIndex } from "./constants.js";

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
  
  // Keep track of the last wall we were facing
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

    // If we're facing a different wall than before, log it
    if (currentWall !== lastWall) {
      const startTime = performance.now();
      placePaintings(textureLoader, paintingGroup, wallIndex[currentWall]);
      const endTime = performance.now();
      console.log(`placePaintings took ${(endTime - startTime).toFixed(3)}ms`);
      lastWall = currentWall;
    }

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
