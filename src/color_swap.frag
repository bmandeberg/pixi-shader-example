
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
varying vec2 vTextureCoord; // for filters, use this for normalized pixel coord
uniform sampler2D uSampler;
uniform bool enabled;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec3 shifted = vec3(color.g, color.b, color.r);
    gl_FragColor = vec4(enabled ? shifted : color.rgb, 1.0);
}