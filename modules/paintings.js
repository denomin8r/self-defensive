import * as THREE from 'three';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPlacements, paintingSrcs } from "./paintingData.js";
import { solidColorVertexShader, solidColorFragmentShader, strobeVertexShader, strobeFragmentShader } from './shaders.js';

function getRandomTextureIndex() {
  return Math.floor(Math.random() * paintingSrcs.length);
}

function getRandomInterval(min = 1000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  return new THREE.Vector3(
    Math.random(),
    Math.random(),
    Math.random()
  );
}

function createSolidColorMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: solidColorVertexShader,
    fragmentShader: solidColorFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      color: { value: getRandomColor() },
    }
  });
};

function createStrobeMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: strobeVertexShader,
    fragmentShader: strobeFragmentShader,
    uniforms: {
      // time and frequency are used to strobe the color
      time: { value: 0 },
      frequency: { value: 5.0 },
      color: { value: getRandomColor() }
    },
    side: THREE.DoubleSide
  });
};

export function setupPaintings(scene) {
  // paintings are setup in the order Front, Right, Back, Left
  let paintingGroup = new THREE.Group();

  paintingPlacements.forEach((placement) => {
    const painting = new THREE.Mesh( 
      new THREE.PlaneGeometry(placement.width, placement.height),
      new THREE.MeshLambertMaterial({ 
        side: THREE.DoubleSide,
        color: 0x808080 // Gray color
      })
    );

    painting.position.set(placement.x, placement.y, placement.z); 
    painting.rotation.y = placement.rotationY; 
    painting.castShadow = true; 
    painting.receiveShadow = true;
    painting.wall = placement.wall;

    paintingGroup.add(painting); 
  });

  createBoundingBoxes(paintingGroup);
  scene.add(paintingGroup);

  return paintingGroup;
}

function stage_solid(painting) {
  // Stage 1: Only solid colors
  const newSolidColorMaterial = createSolidColorMaterial();
  painting.material = newSolidColorMaterial;
  painting.material.needsUpdate = true;
}

function stage_strobe(painting) {
  // Stage 2: Strobe
  const newStrobeMaterial = createStrobeMaterial();
  painting.material = newStrobeMaterial;
  painting.material.needsUpdate = true;
}

function stage_self_defensive(painting, textureLoader) {
  // Stage 3: Self-Defensive images
  painting.material = new THREE.MeshLambertMaterial({ 
    side: THREE.DoubleSide,
  });
  
  const newTextureIndex = getRandomTextureIndex();
  textureLoader.load(paintingSrcs[newTextureIndex], (newTexture) => {
    painting.material.map = newTexture;
    painting.material.needsUpdate = true;
  });
}

// Store all timeout IDs
let textureChangeTimeouts = new Set();
let textureChangeStartTime = null;

function changeTexture(painting) {
  console.log(painting.wall + ": " + (Date.now() - textureChangeStartTime) + " ms");

  const elapsedTime = (Date.now() - textureChangeStartTime) / 1000;
  if (elapsedTime < 5) {
    stage_solid(painting);
  } else if (elapsedTime < 10) {
    stage_strobe(painting);
  } else {
    stage_self_defensive(painting, textureLoader);
  }
  
  // Schedule next texture change with random interval
  const timeoutId = setTimeout(() => changeTexture(painting), getRandomInterval());
  textureChangeTimeouts.add(timeoutId);
}

export function startTextureChanges(paintingGroup, textureLoader) {
  // Set the start time when texture changes begin
  textureChangeStartTime = Date.now();
  
  // Process all paintings including the front wall
  paintingGroup.children.forEach((painting) => {
    // Start the first texture change
    changeTexture(painting);
  });
}

export function clearAllTextureChanges() {
  textureChangeTimeouts.forEach(timeoutId => {
    clearTimeout(timeoutId);
  });
  // Clear the set of texture change timeouts after disabling each timeout
  textureChangeTimeouts.clear();
  textureChangeStartTime = null;
}
