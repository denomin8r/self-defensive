import * as THREE from 'three';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPlacements, paintingSrcs } from "./paintingData.js";

function getRandomTextureIndex() {
  return Math.floor(Math.random() * paintingSrcs.length);
}

function getRandomInterval(min = 1000, max = 3000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

    paintingGroup.add(painting); 
  });

  createBoundingBoxes(paintingGroup);
  scene.add(paintingGroup);

  return paintingGroup;
}

export function startTextureChanges(paintingGroup, textureLoader) {
  // Remove color from all paintings
  paintingGroup.children.forEach((painting) => {
    delete painting.material.color;
    
    const changeTexture = () => {
      const newTextureIndex = getRandomTextureIndex();
      textureLoader.load(paintingSrcs[newTextureIndex], (newTexture) => {
        painting.material.map = newTexture;
        painting.material.needsUpdate = true;
        
        // Schedule next texture change with random interval
        setTimeout(changeTexture, getRandomInterval());
      });
    };
    
    // Start the first texture change
    changeTexture();
  });
}
