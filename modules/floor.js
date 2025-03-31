import * as THREE from "three";
import { roomDimensions } from "./constants";

export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader();

  // Load the textures
  const colorTexture = textureLoader.load(
    "public/Floor/WoodFloor040_2K-JPG_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "public/Floor/WoodFloor040_2K-JPG_Displacement.jpg"
  );
  const normalTexture = textureLoader.load(
    "public/Floor/WoodFloor040_2K-JPG_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "public/Floor/WoodFloor040_2K-JPG_Roughness.jpg"
  );
  const aoTexture = textureLoader.load(
    "public/Floor/WoodFloor040_2K-JPG_AmbientOcclusion.jpg"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;

  const planeGeometry = new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.depth);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.floor(roomDimensions.height / 2) + 1;

  scene.add(floorPlane);
};
