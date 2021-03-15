#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUvs;
uniform vec2 resolution;
uniform float devicePixelRatio;
uniform float b;

void main() {
	vec2 uv = vUvs * devicePixelRatio; // use this for normalized pixel coordinate
	gl_FragColor = vec4(uv.x, uv.y, b, 1.);
}