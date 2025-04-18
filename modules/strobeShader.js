export class StrobeShader {
    constructor(gl) {
        this.gl = gl;
        this.program = this.createProgram();
        this.time = 0;
        this.color = [1.0, 1.0, 1.0, 1.0]; // Default white color
        this.frequency = 10.0; // Flashes per second
    }

    createProgram() {
        const vertexShader = this.createShader(`
            attribute vec2 a_position;
            varying vec2 v_texCoord;
            
            void main() {
                gl_Position = vec4(a_position, 0, 1);
                v_texCoord = a_position * 0.5 + 0.5;
            }
        `, this.gl.VERTEX_SHADER);

        const fragmentShader = this.createShader(`
            precision mediump float;
            uniform vec4 u_color;
            uniform float u_time;
            uniform float u_frequency;
            varying vec2 v_texCoord;
            
            void main() {
                float flash = sin(u_time * u_frequency * 6.28318530718) * 0.5 + 0.5;
                gl_FragColor = u_color * flash;
            }
        `, this.gl.FRAGMENT_SHADER);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Shader program failed to link:', this.gl.getProgramInfoLog(program));
        }

        return program;
    }

    createShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    setColor(r, g, b, a = 1.0) {
        this.color = [r, g, b, a];
    }

    setFrequency(frequency) {
        this.frequency = frequency;
    }

    update(deltaTime) {
        this.time += deltaTime;
    }

    use() {
        this.gl.useProgram(this.program);
        
        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        const colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
        const frequencyLocation = this.gl.getUniformLocation(this.program, 'u_frequency');

        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform4fv(colorLocation, this.color);
        this.gl.uniform1f(frequencyLocation, this.frequency);
    }
} 