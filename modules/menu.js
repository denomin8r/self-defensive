import { startTextureChanges } from './paintings.js';

export const hideMenu = () => {
  const menu = document.getElementById('menu');
  menu.style.display = 'none'; // Hide the menu
};

export const showMenu = () => {
  const menu = document.getElementById('menu');
  menu.style.display = 'block'; // Show the menu
};

// Lock the pointer (controls are activated) and hide the menu when the experience starts
export const startExperience = (controls, paintingGroup, textureLoader) => {
  controls.lock(); // Lock the pointer (controls are activated)
  hideMenu();
  startTextureChanges(paintingGroup, textureLoader);
};

export const setupPlayButton = (controls, paintingGroup, textureLoader) => {
  const playButton = document.getElementById('play_button'); // Get the reference
  playButton.addEventListener('click', () => startExperience(controls, paintingGroup, textureLoader)); // Add the click event listener to the play button to start the experience
};
