import * as THREE from 'three';
import { addObjectsToScene } from './sceneHelpers.js';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPositions as paintingPlacements, paintingSrcs } from "./paintingData.js";

export function placePaintings(scene, textureLoader, startIndex) {
 
  let paintings = [];

  paintingSrcs.forEach((src, index) => {
    
    const placement = paintingPlacements[(index + startIndex) % paintingPlacements.length];

    const painting = new THREE.Mesh( 
      new THREE.PlaneGeometry(placement.width, placement.height),
      new THREE.MeshLambertMaterial({ 
        map: textureLoader.load(src),
        side: THREE.DoubleSide,
      })
    );

    painting.position.set(placement.x, placement.y, placement.z); 
    painting.rotation.y = placement.rotationY; 
    painting.castShadow = true; 
    painting.receiveShadow = true; 

    paintings.push(painting); 
  });

  createBoundingBoxes(paintings);
  addObjectsToScene(scene, paintings);
}
