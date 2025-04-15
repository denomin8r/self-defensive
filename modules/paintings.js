import * as THREE from 'three';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPlacements, paintingSrcs } from "./paintingData.js";

function getRandomTextureIndex() {
  return Math.floor(Math.random() * paintingSrcs.length);
}

export function setupPaintings(scene, textureLoader) {
  // paintings are setup in the order Front, Right, Back, Left
  let paintingGroup = new THREE.Group();

  paintingPlacements.forEach((placement) => {
    const painting = new THREE.Mesh( 
      new THREE.PlaneGeometry(placement.width, placement.height),
      new THREE.MeshLambertMaterial({ 
        side: THREE.DoubleSide,
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

  // Start the texture change timer
  setInterval(() => {
    paintingGroup.children.forEach((painting) => {
      const newTextureIndex = getRandomTextureIndex();
      
      // Load the new texture first
      textureLoader.load(paintingSrcs[newTextureIndex], (newTexture) => {
        // Only swap in the new texture once it's fully loaded
        painting.material.map = newTexture;
        painting.material.needsUpdate = true;
      });
    });
  }, 2000);

  return paintingGroup;
}

export function placePaintings(textureLoader, paintingGroup, startIndex) {
  paintingGroup.children.forEach((painting, index) => {
    textureLoader.load(paintingSrcs[(index - startIndex + paintingSrcs.length) % paintingSrcs.length], (texture) => {
      painting.material.map = texture;
      painting.material.needsUpdate = true;
    });
  });
}