import * as THREE from 'three';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPlacements, paintingSrcs } from "./paintingData.js";

export function setupPaintings(scene) {
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

  return paintingGroup;
}

export function placePaintings(textureLoader, paintingGroup, startIndex) {
  paintingGroup.children.forEach((painting, index) => {
    painting.material.map = textureLoader.load(paintingSrcs[(index - startIndex + paintingSrcs.length) % paintingSrcs.length]);
    painting.material.needsUpdate = true;
  });
}