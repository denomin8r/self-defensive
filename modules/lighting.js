import * as THREE from "three";
import { GUI } from "lil-gui";

export const setupLighting = (scene, paintings) => {
  // Initialize GUI
  const gui = new GUI();

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // GUI for Ambient Light
  const ambientFolder = gui.addFolder("Ambient Light");
  ambientFolder.add(ambientLight, "intensity", 0, 2);

  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    // Add spotlight and its target to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Add a helper for this spotlight
    // const spotlightHelper = new THREE.SpotLightHelper(spotlight);
    // scene.add(spotlightHelper);

    // Create a GUI folder for this spotlight
    const folder = gui.addFolder(`Spotlight (${x}, ${y}, ${z})`);
    folder.add(spotlight, "intensity", 0, 4);
    folder.add(spotlight, "angle", 0, Math.PI / 2).name("Angle");
    folder.add(spotlight, "penumbra", 0, 1).name("Penumbra");
    folder.add(spotlight, "decay", 0, 2).name("Decay");
    folder.add(spotlight, "distance", 0, 100).name("Distance");
    folder.add(spotlight.position, "light x", -50, 50);
    folder.add(spotlight.position, "light y", -50, 50);
    folder.add(spotlight.position, "light z", -50, 50);
    folder.add(spotlight.target.position, "target x", -50, 50);
    folder.add(spotlight.target.position, "target y", -50, 50);
    folder.add(spotlight.target.position, "target z", -50, 50);

    return spotlight;
  }

  const frontWallSpotlight = createSpotlight(
    0,
    6.7,
    -13,
    0.948,
    new THREE.Vector3(0, 0, -20)
  );

  const backWallSpotlight = createSpotlight(
    0,
    6.7,
    13,
    0.948,
    new THREE.Vector3(0, 0, 20)
  );

  const leftWallSpotlight = createSpotlight(
    -13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(-20, 0, 0)
  );

  const rightWallSpotlight = createSpotlight(
    13,
    6.7,
    0,
    0.948,
    new THREE.Vector3(20, 0, 0)
  );

  return gui;
};
