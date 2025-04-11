import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { setupPaintings, placePaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling as setupCeiling } from "./modules/ceiling.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { setupPlayButton } from "./modules/menu.js";
import { wallIndex } from "./modules/constants.js";

let { camera, controls, renderer } = setupScene();

const textureLoader = new THREE.TextureLoader();

setupFloor(scene, textureLoader);
setupCeiling(scene, textureLoader);
setupLighting(scene);

const wallGroup = createWalls(scene, textureLoader);
const paintingGroup = setupPaintings(scene);

// Initial placement of paintings
placePaintings(textureLoader, paintingGroup, wallIndex.front);

setupPlayButton(controls);
setupEventListeners(renderer, controls);
setupRendering(scene, camera, renderer, controls,textureLoader, wallGroup, paintingGroup);
