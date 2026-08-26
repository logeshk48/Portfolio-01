/**
 * The room. One place for every colour and every object in the scene,
 * so the whole mood can be retuned from a single file.
 */

export const NEON = {
  bg: 0x0a0a18,
  wall: 0x191634,
  floor: 0x141130,
  furniture: 0x1a1638,
  desk: 0x241f4c,
  dark: 0x171334,
  hood: 0x120f2c,
  screen: 0x9cc8ff,
  screen2: 0x6e86d8,
  violet: 0x7c5cff,
  ice: 0x63e8ff,
  warm: 0xff9a46,
} as const;

export interface CardSpec {
  label: string;
  tag: string;
  color: number;
  pos: [number, number, number];
}

export const CARDS: CardSpec[] = [
  { label: "Aegis", tag: "ai assistant", color: NEON.ice, pos: [-6.2, 5.4, -5.2] },
  { label: "Fitlog", tag: "fitness", color: NEON.violet, pos: [6.8, 6.2, -5.8] },
  { label: "Corpus", tag: "finance", color: NEON.ice, pos: [-8.4, 2.6, -4.4] },
  { label: "LetsCook", tag: "building", color: NEON.violet, pos: [8.6, 3.0, -4.0] },
  { label: "RAG", tag: "retrieval", color: NEON.screen, pos: [2.2, 7.4, -6.6] },
];

/** deterministic PRNG so the clutter is identical on every load */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function cardTexture(
  label: string,
  tag: string,
  hex: number
): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  const col = "#" + hex.toString(16).padStart(6, "0");

  g.fillStyle = "rgba(18,15,42,0.90)";
  g.fillRect(0, 0, 512, 256);
  g.strokeStyle = col;
  g.lineWidth = 4;
  g.strokeRect(2, 2, 508, 252);

  g.fillStyle = "#F2F1FA";
  g.font = '700 58px Geist, system-ui, sans-serif';
  g.fillText(label, 32, 120);

  g.fillStyle = col;
  g.font = '500 24px "Geist Mono", monospace';
  g.fillText(tag.toUpperCase(), 32, 172);

  return c;
}