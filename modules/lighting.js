import * as THREE from "three";
import { roomDimensions } from "./constants";

export const setupLighting = (scene) => {
  const lightGroup = new THREE.Group();

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  lightGroup.add(ambientLight);

  function createSpotlight(x, y, z) {
    const targetPosition = new THREE.Vector3(0, -10, 0);
    const spotlight = new THREE.SpotLight(0xffffff, 0.6);
    spotlight.position.set(x, y, z);
    spotlight.intensity = 1;
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.penumbra = .7;
    spotlight.decay = .7;
    spotlight.distance = 50;

    // Add spotlight and its target to the scene
    lightGroup.add(spotlight);
    lightGroup.add(spotlight.target);
  }

  createSpotlight(0, roomDimensions.height - 1, roomDimensions.frontWallZ);
  createSpotlight(0, roomDimensions.height - 1, roomDimensions.backWallZ);
  createSpotlight(roomDimensions.leftWallX, roomDimensions.height - 1, 0);
  createSpotlight(roomDimensions.rightWallX, roomDimensions.height - 1, 0);

  scene.add(lightGroup);
};
