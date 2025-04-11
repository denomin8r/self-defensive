import { roomDimensions, MARGIN } from "./constants";

export const paintingData = [
  // Front Wall
  {
    imgSrc: `artworks/Front.jpg`,
    width: roomDimensions.width - MARGIN, // width of the painting
    height: roomDimensions.height - MARGIN, // height of the painting
    position: { x: 0, y: 0, z: roomDimensions.frontWallZ + 0.01 }, // position of the painting
    rotationY: 0, // rotation of the painting
    direction: `Front`,
  },
  // Back Wall
  {
    imgSrc: `artworks/Back.jpg`,
    width: roomDimensions.width - MARGIN,
    height: roomDimensions.height - MARGIN,
    position: { x: 0, y: 0, z: roomDimensions.backWallZ - 0.01 },
    rotationY: Math.PI,
    direction: `Back`,
  },
  // Left Wall
  {
    imgSrc: `artworks/Left.jpg`,
    width: roomDimensions.depth - MARGIN,
    height: roomDimensions.height - MARGIN,
    position: { x: roomDimensions.leftWallX + .01, y: 0, z: 0},
    rotationY: Math.PI / 2,
    direction: `Left`,
  },
  // Right
  {
    imgSrc: `artworks/Right.jpg`,
    width: roomDimensions.depth - MARGIN,
    height: roomDimensions.height - MARGIN,
    position: { x: roomDimensions.rightWallX - 0.1, y: 0, z: 0},
    rotationY: -Math.PI / 2,
    direction: `Right`,
  },
];
