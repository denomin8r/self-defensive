import * as THREE from 'three';
import { createBoundingBoxes } from './boundingBox.js';
import { paintingPlacements, paintingSrcs } from "./paintingData.js";

function getRandomTextureIndex() {
  return Math.floor(Math.random() * paintingSrcs.length);
}

function getRandomInterval(min = 1000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function createStrobeMaterial() {
  const randomColor = new THREE.Vector3(
    Math.random(),
    Math.random(),
    Math.random()
  );
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      frequency: { value: 5.0 },
      color: { value: randomColor }
    },
    side: THREE.DoubleSide
  });
}

function createSolidColorMaterial() {
  const randomColor = new THREE.Vector3(
    Math.random(),
    Math.random(),
    Math.random()
  );
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      color: { value: randomColor },
    }
  });
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
    painting.wall = placement.wall;

    paintingGroup.add(painting); 
  });

  createBoundingBoxes(paintingGroup);
  scene.add(paintingGroup);

  return paintingGroup;
}

function stage1(painting) {
  // Stage 1: Only solid colors
  const newSolidColorMaterial = createSolidColorMaterial();
  painting.material = newSolidColorMaterial;
  painting.material.needsUpdate = true;
}

function stage2(painting) {
  // Stage 2: Strobe
  const newStrobeMaterial = createStrobeMaterial();
  painting.material = newStrobeMaterial;
  painting.material.needsUpdate = true;
}

function stage3(painting, textureLoader) {
  // Stage 3: Mix of all three

  // Create new painting material and load texture
  painting.material = new THREE.MeshLambertMaterial({ 
    side: THREE.DoubleSide,
  });
  
  const newTextureIndex = getRandomTextureIndex();
  textureLoader.load(paintingSrcs[newTextureIndex], (newTexture) => {
    painting.material.map = newTexture;
    painting.material.needsUpdate = true;
  });
}

export function startTextureChanges(paintingGroup, textureLoader) {
  let startTime = Date.now();
  
  // Process all paintings including the front wall
  paintingGroup.children.forEach((painting) => {
    const changeTexture = () => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
      
      if (elapsedTime < 10) {
        if (painting.stage !== 1) {
          painting.stage = 1;
          console.log(elapsedTime + ": " + painting.wall + " stage 1");
        }
        stage1(painting);
      } else if (elapsedTime < 20) {
        if (painting.stage !== 2) {
          painting.stage = 2;
          console.log(elapsedTime + ": " + painting.wall + " stage 2");
        }
        stage2(painting);
      } else {
        if (painting.stage !== 3) {
          painting.stage = 3;
          console.log(elapsedTime + ": " + painting.wall + " stage 3");
        }
        stage3(painting, textureLoader);
      }
      
      // Schedule next texture change with random interval
      const interval = getRandomInterval();
      setTimeout(changeTexture, interval);
    };
    
    // Start the first texture change
    changeTexture();
  });
}
