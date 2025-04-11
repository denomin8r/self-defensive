import { roomDimensions, margin } from "./constants";

export const paintingSrcs = [
  `artworks/1.jpg`,
  `artworks/2.jpg`,
  `artworks/3.jpg`,
  `artworks/4.jpg`,
];

export const paintingPositions = [
  { // Front
    x: 0,
    y: 0,
    z: roomDimensions.frontWallZ + 0.01,
    rotationY: 0,
    width: roomDimensions.width - margin,
    height: roomDimensions.height - margin,
  },
  { // Right
    x: roomDimensions.rightWallX - 0.01,
    y: 0,
    z: 0,
    rotationY: -Math.PI / 2,
    width: roomDimensions.depth - margin,
    height: roomDimensions.height - margin,
  },
  { // Back
    x: 0,
    y: 0,
    z: roomDimensions.backWallZ - 0.01,
    rotationY: Math.PI,
    width: roomDimensions.width - margin,
    height: roomDimensions.height - margin,
  },
  { // Left
    x: roomDimensions.leftWallX + 0.01,
    y: 0,
    z: 0,
    rotationY: Math.PI / 2,
    width: roomDimensions.depth - margin,
    height: roomDimensions.height - margin,
  },
];
