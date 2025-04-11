import * as THREE from "three";
import { roomDimensions } from "./constants";

export const setupLighting = (scene) => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  function createSpotlight(x, y, z, name) {
    const targetPosition = new THREE.Vector3(0, -10, 0);
    const spotlight = new THREE.SpotLight(0xffffff, 0.6);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.penumbra = .7;
    spotlight.decay = .7;
    spotlight.distance = 40;

    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);

    return spotlight;
  }

  createSpotlight(0, roomDimensions.height - 1, roomDimensions.frontWallZ, 'Front');
  createSpotlight(0, roomDimensions.height - 1, roomDimensions.backWallZ, 'Back');
  createSpotlight(roomDimensions.leftWallX, roomDimensions.height - 1, 0, 'Left');
  createSpotlight(roomDimensions.rightWallX, roomDimensions.height - 1, 0, 'Right');
};
