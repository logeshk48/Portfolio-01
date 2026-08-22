import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uMix;
  uniform float uPulse;
  uniform float uIntensity;
  uniform float uReveal;
  uniform float uDelay;
  uniform vec3  uCopper;
  uniform vec3  uSignal;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    // this route's own slice of the global reveal
    float grow = clamp((uReveal - uDelay) / max(0.0001, 1.0 - uDelay), 0.0, 1.0);
    if (vUv.x > grow) discard;

    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.4);
    vec3 col = uCopper * (0.030 + fres * 0.13);

    // hot tip at the growing end, only while it is still growing
    float etching = step(0.001, grow) * (1.0 - step(0.999, grow));
    float tip = smoothstep(0.045, 0.0, grow - vUv.x) * etching;
    col += mix(uCopper, uSignal, uMix) * tip * 2.6;
    col += vec3(1.0) * pow(tip, 3.0) * 0.9;

    // current only flows once the route is fully etched
    if (uPulse > 0.5 && grow > 0.999) {
      float head = fract(uTime * 0.20 + uPulse * 0.137);

      float d = vUv.x - head;
      d = d - floor(d + 0.5);

      float lead = smoothstep(0.010, 0.0, d) * step(-0.010, d);
      float tail = exp(-max(0.0, -d) * 34.0);
      float glow = clamp(lead + tail * 0.85, 0.0, 1.0);

      vec3 hot = mix(uCopper, uSignal, uMix);
      col += hot * glow * 1.7 * uIntensity;
      col += vec3(1.0) * pow(glow, 6.0) * 0.55 * uIntensity;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function createTraceMaterial(pulse: number, delay: number) {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uPulse: { value: pulse },
      uIntensity: { value: 1 },
      uReveal: { value: 0 },
      uDelay: { value: delay },
      uCopper: { value: new THREE.Color("#c2793e") },
      uSignal: { value: new THREE.Color("#6e8bff") },
    },
    toneMapped: false,
  });
}