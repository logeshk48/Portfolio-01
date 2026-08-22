import * as THREE from "three";

/**
 * Manhattan-routed copper. Real autorouters turn at 45°, never 90° —
 * sharp corners trap etching acid. Every corner here is chamfered.
 *
 * Routing rule: the region x ∈ [-13, 2], y ∈ [-5, 4.5] is the headline
 * keep-out zone. Nothing routes through it. Copper hugs the edges and
 * converges on the package to the right of the text.
 */

export interface Route {
  pts: [number, number][];
  pulse: number;   // 0 = idle trace, >0 = carries current (phase offset)
  layer: number;   // z-lift so overlapping routes read as separate layers
}

export const CHIP: [number, number] = [6.2, 0.4];

export const ROUTES: Route[] = [
  // top and bottom rails, edge to edge
  { pts: [[-19, 7.2], [-2.0, 7.2], [-0.4, 6.0], [9.0, 6.0], [10.6, 7.2], [19, 7.2]], pulse: 1, layer: 0.06 },
  { pts: [[-19, -7.4], [-3.0, -7.4], [-1.6, -6.2], [8.0, -6.2], [9.6, -7.4], [19, -7.4]], pulse: 2, layer: 0.06 },

  // feeds converging on the package
  { pts: [[19, 3.4], [12.4, 3.4], [11.0, 2.2], [8.2, 2.2], [7.0, 1.3]], pulse: 3, layer: 0.05 },
  { pts: [[19, -2.6], [13.0, -2.6], [11.6, -1.4], [8.4, -1.4], [7.2, -0.5]], pulse: 4, layer: 0.05 },
  { pts: [[6.4, 10], [6.4, 4.2], [5.2, 3.0], [5.2, 1.3]], pulse: 5, layer: 0.04 },
  { pts: [[3.0, -10], [3.0, -4.0], [4.2, -2.8], [4.2, -0.5]], pulse: 6, layer: 0.04 },

  // idle copper — right field
  { pts: [[19, 0.2], [13.6, 0.2], [12.4, 1.4], [12.4, 5.4]], pulse: 0, layer: 0.03 },
  { pts: [[13.2, -10], [13.2, -5.2], [14.4, -4.0], [19, -4.0]], pulse: 0, layer: 0.03 },

  // above and below the headline, never through it
  { pts: [[-19, 5.2], [-11.0, 5.2], [-9.6, 6.4], [-2.0, 6.4]], pulse: 7, layer: 0.04 },
  { pts: [[-19, -5.6], [-12.0, -5.6], [-10.6, -6.8], [-4.0, -6.8]], pulse: 0, layer: 0.03 },

  // far-left spine, out past the gutter
  { pts: [[-15.4, 10], [-15.4, 6.0], [-14.2, 4.8], [-14.2, -4.0], [-15.4, -5.2], [-15.4, -10]], pulse: 0, layer: 0.02 },
];

export const VIAS: [number, number][] = [
  [-2.0, 7.2], [-0.4, 6.0], [9.0, 6.0], [10.6, 7.2],
  [-3.0, -7.4], [-1.6, -6.2], [8.0, -6.2], [9.6, -7.4],
  [11.0, 2.2], [11.6, -1.4], [5.2, 3.0], [4.2, -2.8],
  [12.4, 1.4], [14.4, -4.0], [-9.6, 6.4], [-10.6, -6.8],
  [-14.2, 4.8], [-14.2, -4.0],
];

const CHAMFER = 0.42;

export function routeCurve(pts: [number, number][], z: number): THREE.CatmullRomCurve3 {
  const out: THREE.Vector3[] = [];

  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i];

    if (i === 0 || i === pts.length - 1) {
      out.push(new THREE.Vector3(cur[0], cur[1], z));
      continue;
    }

    const prev = pts[i - 1];
    const next = pts[i + 1];

    const inDir = new THREE.Vector2(cur[0] - prev[0], cur[1] - prev[1]);
    const outDir = new THREE.Vector2(next[0] - cur[0], next[1] - cur[1]);
    const inLen = inDir.length();
    const outLen = outDir.length();

    if (inLen < 1e-4 || outLen < 1e-4) {
      out.push(new THREE.Vector3(cur[0], cur[1], z));
      continue;
    }
    inDir.divideScalar(inLen);
    outDir.divideScalar(outLen);

    const back = Math.min(CHAMFER, inLen * 0.45);
    const fwd = Math.min(CHAMFER, outLen * 0.45);

    out.push(new THREE.Vector3(cur[0] - inDir.x * back, cur[1] - inDir.y * back, z));
    out.push(new THREE.Vector3(cur[0] + outDir.x * fwd, cur[1] + outDir.y * fwd, z));
  }

  return new THREE.CatmullRomCurve3(out, false, "catmullrom", 0.02);
}