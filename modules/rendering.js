import * as THREE from "three";
import { updateMovement } from "./movement.js";

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock();

  let render = function () {
    const delta = clock.getDelta();

    updateMovement(delta, controls, camera, walls);

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
