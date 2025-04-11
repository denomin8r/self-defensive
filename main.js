import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { placePaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling as setupCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { setupPlayButton } from "./modules/menu.js";
import { wallIndex } from "./modules/constants.js";

let { camera, controls, renderer } = setupScene();

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);

setupFloor(scene);
setupCeiling(scene, textureLoader);
setupLighting(scene);

createBoundingBoxes(walls);

// Initial placement of paintings
placePaintings(scene, textureLoader, wallIndex.front);

setupPlayButton(controls);
setupEventListeners(renderer, controls);
setupRendering(scene, camera, renderer, controls, walls, textureLoader);
