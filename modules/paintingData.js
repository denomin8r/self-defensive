import { roomDimensions } from "./constants";

export const paintingData = [
  // Front Wall
  {
    imgSrc: `artworks/Front.jpg`,
    width: roomDimensions.width - 4, // width of the painting
    height: roomDimensions.height - 4, // height of the painting
    position: { x: 0, y: 0, z: roomDimensions.frontWallZ }, // position of the painting
    rotationY: 0, // rotation of the painting
    direction: `Front`,
  },
  // Back Wall
  {
    imgSrc: `artworks/Back.jpg`,
    width: roomDimensions.depth - 4,
    height: roomDimensions.height - 4,
    position: { x: 0, y: 0, z: roomDimensions.backWallZ },
    rotationY: Math.PI,
    direction: `Back`,
  },
  // Left Wall
  {
    imgSrc: `artworks/Left.jpg`,
    width: 5,
    height: 3,
    position: { x: roomDimensions.leftWallX, y: 0, z: 0},
    rotationY: Math.PI / 2,
    direction: `Left`,
  },
  // Right
  {
    imgSrc: `artworks/Right.jpg`,
    width: 5,
    height: 3,
    position: { x: roomDimensions.rightWallX, y: 0, z: 0},
    rotationY: -Math.PI / 2,
    direction: `Right`,
  },
];
