"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CHIP, ROUTES, VIAS, routeCurve } from "@/lib/board";
import { createTraceMaterial } from "./traceMaterial";

const COPPER = new THREE.Color("#c2793e");
const SIGNAL = new THREE.Color("#6e8bff");

function Traces({ mix }: { mix: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  const built = useMemo(
    () =>
      ROUTES.map((r) => ({
        geo: new THREE.TubeGeometry(routeCurve(r.pts, r.layer), 200, 0.019, 6, false),
        mat: createTraceMaterial(r.pulse),
      })),
    []
  );

  // walk the scene graph rather than the memoized array — uniforms are
  // mutated 60x/sec and memoized values must stay immutable
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    for (const child of g.children) {
      const mat = (child as THREE.Mesh).material as THREE.ShaderMaterial;
      if (!mat?.uniforms) continue;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uMix.value = mix.current;
    }
  });

  useEffect(
    () => () => {
      for (const b of built) {
        b.geo.dispose();
        b.mat.dispose();
      }
    },
    [built]
  );

  return (
    <group ref={group}>
      {built.map((b, i) => (
        <mesh key={i} geometry={b.geo} frustumCulled={false}>
          <primitive object={b.mat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function Vias() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh || mesh.userData.placed) return;
    VIAS.forEach((v, i) => {
      dummy.position.set(v[0], v[1], 0.05);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.placed = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, VIAS.length]} frustumCulled={false}>
      <cylinderGeometry args={[0.052, 0.052, 0.03, 14]} />
      <meshStandardMaterial
        color="#8a5a2e"
        metalness={0.95}
        roughness={0.34}
        emissive={COPPER}
        emissiveIntensity={0.05}
      />
    </instancedMesh>
  );
}

/** The package. Body, pin-1 dimple, and two rows of gull-wing pins. */
function Chip({ mix }: { mix: React.RefObject<number> }) {
  const body = useRef<THREE.Mesh>(null);
  const pins = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const PIN_COUNT = 28;

  useFrame((state) => {
    const mesh = pins.current;
    if (mesh && !mesh.userData.placed) {
      for (let i = 0; i < PIN_COUNT; i++) {
        const side = i < PIN_COUNT / 2 ? -1 : 1;
        const k = i % (PIN_COUNT / 2);
        dummy.position.set(-1.36 + k * 0.196, side * 0.70, 0.04);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.userData.placed = true;
    }

    if (body.current) {
      const m = body.current.material as THREE.MeshStandardMaterial;
      m.emissive.copy(COPPER).lerp(SIGNAL, mix.current);
      m.emissiveIntensity = 0.05 + Math.sin(state.clock.elapsedTime * 1.4) * 0.014;
    }
  });

  return (
    <group position={[CHIP[0], CHIP[1], 0.12]}>
      <mesh ref={body} castShadow>
        <boxGeometry args={[3.0, 1.35, 0.22]} />
        <meshStandardMaterial color="#0d1014" metalness={0.5} roughness={0.55} />
      </mesh>

      {/* pin-1 dimple */}
      <mesh position={[-1.26, 0.42, 0.12]}>
        <circleGeometry args={[0.07, 20]} />
        <meshStandardMaterial color="#05060a" roughness={1} />
      </mesh>

      <instancedMesh ref={pins} args={[undefined, undefined, PIN_COUNT]} frustumCulled={false}>
        <boxGeometry args={[0.07, 0.30, 0.045]} />
        <meshStandardMaterial color="#c9cdd2" metalness={1} roughness={0.28} />
      </instancedMesh>
    </group>
  );
}

/** FR-4 substrate — matte, absorbs almost all the light. */
function Substrate() {
  return (
    <mesh position={[0, 0, -0.02]} receiveShadow>
      <planeGeometry args={[70, 44]} />
      <meshStandardMaterial color="#090b0e" roughness={0.98} metalness={0.04} />
    </mesh>
  );
}

export default function Board({ mix }: { mix: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // pointer drives a damped drift — the board is a physical object on a desk
    target.current.x = state.pointer.y * 0.075;
    target.current.y = state.pointer.x * 0.11;

    // frame-rate independent damping
    const k = 1 - Math.pow(0.0018, delta);
    g.rotation.x += (target.current.x - g.rotation.x) * k;
    g.rotation.y += (target.current.y - g.rotation.y) * k;
    g.position.x += (state.pointer.x * 0.42 - g.position.x) * k;
    g.position.y += (state.pointer.y * 0.28 - g.position.y) * k;
  });

  const scale = size.width < 1200 ? 0.88 : 1;

  return (
    <group ref={group} scale={scale} rotation={[-0.30, 0, 0]}>
      <Substrate />
      <Traces mix={mix} />
      <Vias />
      <Chip mix={mix} />

      <ambientLight intensity={0.16} />
      <pointLight position={[-10, 7, 9]} intensity={30} color="#c2793e" distance={30} decay={2} />
      <pointLight position={[12, -6, 8]} intensity={22} color="#6e8bff" distance={30} decay={2} />
      <directionalLight position={[0, 8, 12]} intensity={0.32} color="#ffffff" />
    </group>
  );
}