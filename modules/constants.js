const roomWidth = 20;
const roomHeight = 20;
const roomDepth = 20;

export const margin = 4;

export const roomDimensions = {
    "width": roomWidth,
    "depth": roomDepth,
    "height": roomHeight,
    "backWallZ" : Math.floor(roomDepth / 2),
    "frontWallZ" :-Math.floor(roomDepth / 2),
    "rightWallX" : Math.floor(roomWidth / 2),
    "leftWallX" : -Math.floor(roomWidth / 2),
};

export const wallIndex = {
  front: 0,
  right: 1,
  back: 2,
  left: 3,
};
