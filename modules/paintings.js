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

  paintingPlacements.forEach((placement, index) => {
    let material;
    
    if (index === 0) {
      // Create a custom shader material for the front wall painting
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float time;
        uniform float frequency;
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
          float flash = sin(time * frequency * 6.28318530718) * 0.5 + 0.5;
          gl_FragColor = vec4(color * flash, 1.0);
        }
      `;

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          time: { value: 0 },
          frequency: { value: 5.0 },
          color: { value: new THREE.Vector3(0.0, 0.278, 0.733) } // #0047bb converted to RGB
        },
        side: THREE.DoubleSide
      });
    } else {
      material = new THREE.MeshLambertMaterial({ 
        side: THREE.DoubleSide,
        color: 0x808080 // Gray color
      });
    }

    const painting = new THREE.Mesh( 
      new THREE.PlaneGeometry(placement.width, placement.height),
      material
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
  // Remove color from all paintings except the front wall painting
  paintingGroup.children.forEach((painting, index) => {
    // Skip the front wall painting (index 0) as it uses the strobe shader
    if (index === 0) return;
    
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
