import * as THREE from "three";

/**
 * Copper trace shader.
 *
 * Base layer: oxidised copper with a faint fresnel so the tube reads as
 * a rounded metal ridge rather than a flat line.
 * Signal layer: a windowed pulse travelling along the tube's length (uv.x).
 * uMix lerps the pulse colour copper → signal, driven from the DOM by the
 * same clock as the --accent custom property. That's how the WebGL and the
 * CSS stay in sync during the boot migration.
 */

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
  uniform float uMix;      // 0 = copper, 1 = signal
  uniform float uPulse;    // 0 = dead trace, >0 = carries current (phase offset)
  uniform float uIntensity;
  uniform vec3  uCopper;
  uniform vec3  uSignal;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    // dull etched copper base
    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.4);
    vec3 base = uCopper * (0.030 + fres * 0.13);

    vec3 col = base;

    if (uPulse > 0.5) {
      float speed = 0.20;
      float head = fract(uTime * speed + uPulse * 0.137);

      // distance along the trace, wrapped, so the pulse loops seamlessly
      float d = vUv.x - head;
      d = d - floor(d + 0.5);

      // sharp leading edge, long decaying tail — like charge dissipating
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

export function createTraceMaterial(pulse: number) {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uPulse: { value: pulse },
      uIntensity: { value: 1 },
      uCopper: { value: new THREE.Color("#c2793e") },
      uSignal: { value: new THREE.Color("#6e8bff") },
    },
    toneMapped: false,
  });
}