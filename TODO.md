# TODO

- Create an independent Strobe Material and a Painting Material, so that if I want I can swap the materials for whatever painting I want

```javascript
// create instance of the shader
const strobeShader = new StrobeShader(gl);

// Set your desired color
strobeShader.setColor(0.0, 1.0, 0.0); // Red color

// Set the flash frequency
strobeShader.setFrequency(5.0);


strobeShader.update(deltaTime);
strobeShader.use();
```

- Algorithm controlling the 4 walls at once

- Have 4algorithm be time-driven. At specific intervals, move to a different phase of development

- Gradually increase speed of transitions

- Get powerful symbols