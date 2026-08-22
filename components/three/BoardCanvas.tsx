"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Board from "./Board";
import BoardFallback from "./BoardFallback";
import { useCapability } from "@/lib/useCapability";

function Scene() {
  // shared 0→1 copper→signal value; Phase 03 animates it
  const mix = useRef(0);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 24], fov: 38, near: 0.1, far: 90 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Board mix={mix} />
      <EffectComposer>
        <Bloom
          intensity={0.95}
          luminanceThreshold={0.62}
          luminanceSmoothing={0.22}
          mipmapBlur
        />
        <Vignette offset={0.18} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}

const LazyScene = dynamic(() => Promise.resolve(Scene), { ssr: false });

export default function BoardCanvas() {
  const { tier, ready } = useCapability();

  if (!ready) return null;
  if (tier === "low") return <BoardFallback />;

  return (
    <div className="absolute inset-0" aria-hidden>
      <LazyScene />
    </div>
  );
}