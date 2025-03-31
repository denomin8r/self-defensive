import * as THREE from "three";
import { roomDimensions } from "./constants";

// create a function that takes a scene and a textureLoader as arguments that will be passed in from main.js where the createCeiling is called
export const createCeiling = (scene, textureLoader) => {
  // Load the textures
  const colorTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_Displacement.jpg"
  );
  const aoTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_AmbientOcclusion.jpg"
  );
  const emissionTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_Emission.jpg"
  );
  const metalnessTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_Metalness.jpg"
  );
  const normalGLTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "public/Ceiling/OfficeCeiling005_2K-JPG_Roughness.jpg"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
  emissionTexture.wrapS = emissionTexture.wrapT = THREE.RepeatWrapping;
  metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping;
  normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const ceilingGeometry = new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.depth);
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: colorTexture,
    normalMap: normalGLTexture,
    normalMapType: THREE.TangentSpaceNormalMap,
    emissiveMap: emissionTexture,
    side: THREE.DoubleSide,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;

  ceilingPlane.position.y = roomDimensions.height / 2;

  scene.add(ceilingPlane);
};
