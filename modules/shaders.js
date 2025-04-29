export const solidColorVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
export const solidColorFragmentShader = `
  uniform vec3 color;
  varying vec2 vUv;
  
  void main() {
    gl_FragColor = vec4(color, 1.0);
  }
`;
export const strobeVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
export const strobeFragmentShader = `
  uniform float time;
  uniform float frequency;
  uniform vec3 color;
  varying vec2 vUv;
  
  void main() {
    float flash = sin(time * frequency * 6.28318530718) * 0.5 + 0.5;
    gl_FragColor = vec4(color * flash, 1.0);
  }
`;
