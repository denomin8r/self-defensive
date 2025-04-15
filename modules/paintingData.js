import { roomDimensions, margin } from "./constants";

export const paintingSrcs = Array.from(
  { length: 10 },
  (_, i) => `artworks/${i + 1}.jpg`
);

export const paintingPlacements = [
  { // Front Wall
    x: 0,
    y: 0,
    z: roomDimensions.frontWallZ + 0.01,
    rotationY: 0,
    width: roomDimensions.width - margin,
    height: roomDimensions.height - margin,
  },
  { // Right Wall
    x: roomDimensions.rightWallX - 0.01,
    y: 0,
    z: 0,
    rotationY: -Math.PI / 2,
    width: roomDimensions.depth - margin,
    height: roomDimensions.height - margin,
  },
  { // Back Wall
    x: 0,
    y: 0,
    z: roomDimensions.backWallZ - 0.01,
    rotationY: Math.PI,
    width: roomDimensions.width - margin,
    height: roomDimensions.height - margin,
  },
  { // Left Wall
    x: roomDimensions.leftWallX + 0.01,
    y: 0,
    z: 0,
    rotationY: Math.PI / 2,
    width: roomDimensions.depth - margin,
    height: roomDimensions.height - margin,
  },
];
