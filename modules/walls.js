import * as THREE from "three";

import { roomDimensions } from "./constants";

export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group();
  scene.add(wallGroup);

  const normalTexture = textureLoader.load(
    "public/Walls/leather_white_nor_gl_4k.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "public/Walls/leather_white_rough_4k.jpg"
  );

  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    side: THREE.DoubleSide,
  });

  // Front Wall
  const frontWall = new THREE.Mesh( 
    new THREE.BoxGeometry(roomDimensions.width, roomDimensions.height, 0.001), 
    wallMaterial 
  );
  frontWall.position.z = roomDimensions.frontWallZ;

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(roomDimensions.width, roomDimensions.height, 0.001),
    wallMaterial 
  );
  backWall.position.z = roomDimensions.backWallZ;

  // Left Wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(roomDimensions.depth, roomDimensions.height, 0.001), 
    wallMaterial
  );
  leftWall.rotation.y = Math.PI / 2; 
  leftWall.position.x = roomDimensions.leftWallX;

  // Right Wall
  const rightWall = new THREE.Mesh( 
    new THREE.BoxGeometry(roomDimensions.depth, roomDimensions.height, 0.001), 
    wallMaterial
  );
  rightWall.rotation.y = -Math.PI / 2; 
  rightWall.position.x = roomDimensions.rightWallX;

  wallGroup.add(frontWall, backWall, leftWall, rightWall);

  return wallGroup;
}
