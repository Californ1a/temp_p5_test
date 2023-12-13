#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform double maxIterations;
uniform float boundary;

void main(){
    vec2 uv = fragCoord / u_resolution.xy;

    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}