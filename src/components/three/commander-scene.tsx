"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { pointerState, scrollState } from "./scroll-store";

/*
  ─────────────────────────────────────────────────────────────
  Sovereign Commander Architecture — live 3D node graph.

  Claude node (amber, larger, glowing) at the top.
  directives.json flows down as an animated particle stream
  along curved tubes. Qwen sub-agents pulse when active.
  Local vs cloud rendered as two distinct ground-grid zones.

  The camera travels THROUGH the system as the user scrolls
  the Architecture section — the graph reconfigures, it is
  never replaced.
  ─────────────────────────────────────────────────────────────
*/

const SIGNAL = "#3E7BFA";
const SIGNAL_DIM = "#234bb0";
const COMMANDER = "#F5A623";
const BASE = "#0B0D10";

/* ── Scene layout ─────────────────────────────────────────── */

const NODES = {
  trigger: new THREE.Vector3(-3.6, 4.4, 2.2),
  commander: new THREE.Vector3(0, 5.1, 0.6),
  orchestrator: new THREE.Vector3(0, 2.1, 1.6),
  script: new THREE.Vector3(-2.5, -0.9, -2.7),
  video: new THREE.Vector3(2.5, -0.9, -2.7),
  output: new THREE.Vector3(0, -3.7, 1.9),
  groundY: -5.3,
} as const;

function bowCurve(a: THREE.Vector3, b: THREE.Vector3, bow: number, lift = 0): THREE.CatmullRomCurve3 {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dir = b.clone().sub(a).normalize();
  const side = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
  mid.addScaledVector(side, bow);
  mid.y += lift;
  return new THREE.CatmullRomCurve3([a.clone(), mid, b.clone()]);
}

/* ── Shared textures ──────────────────────────────────────── */

let haloTex: THREE.Texture | null = null;
function getHaloTexture(): THREE.Texture {
  if (haloTex) return haloTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,0.85)");
  g.addColorStop(0.25, "rgba(255,255,255,0.32)");
  g.addColorStop(0.6, "rgba(255,255,255,0.07)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  haloTex = new THREE.CanvasTexture(c);
  haloTex.colorSpace = THREE.SRGBColorSpace;
  return haloTex;
}

function makeLabelSprite(text: string, color: string, height = 0.3): THREE.Sprite {
  const fs = 46;
  const pad = 26;
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `600 ${fs}px ui-monospace, "JetBrains Mono", monospace`;
  const w = Math.ceil(measure.measureText(text.toUpperCase()).width) + pad * 2;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = fs + pad;
  const ctx = canvas.getContext("2d")!;
  ctx.font = `600 ${fs}px ui-monospace, "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.95)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })
  );
  sprite.scale.set((height * canvas.width) / canvas.height, height, 1);
  return sprite;
}

function makeHaloSprite(color: string): THREE.Sprite {
  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getHaloTexture(),
      color,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
}

/* ── Node ─────────────────────────────────────────────────── */

type NodeProps = {
  position: THREE.Vector3;
  color: string;
  radius: number;
  label: string;
  commander?: boolean;
  activity?: () => number; // 0..1 — pulse when active
};

function SystemNode({ position, color, radius, label, commander = false, activity }: NodeProps) {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const halo = useMemo(() => makeHaloSprite(color), [color]);
  const labelSprite = useMemo(
    () => makeLabelSprite(label, commander ? "#F5A623" : "#8AB2FF", commander ? 0.34 : 0.28),
    [label, commander]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const act = activity ? activity() : 0;
    const breathe = 0.5 + 0.5 * Math.sin(t * (commander ? 0.9 : 1.4) + position.x);
    if (core.current) {
      core.current.scale.setScalar(1 + 0.06 * breathe + 0.22 * act);
      core.current.rotation.y = t * 0.3;
    }
    if (shell.current) {
      shell.current.rotation.y = t * 0.24;
      shell.current.rotation.x = t * 0.11;
      (shell.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + 0.12 * breathe + 0.2 * act;
    }
    (halo.material as THREE.SpriteMaterial).opacity =
      (commander ? 0.5 : 0.26) + 0.28 * breathe + 0.42 * act;
    halo.scale.setScalar(radius * (5.4 + 1.6 * breathe + 2.6 * act));
    if (ring.current) {
      ring.current.rotation.z = t * 0.18;
      ring.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.3) * 0.12;
    }
  });

  return (
    <group position={position}>
      <mesh ref={core}>
        <icosahedronGeometry args={[radius, commander ? 2 : 1]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[radius * 1.5, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.16} toneMapped={false} />
      </mesh>
      <primitive object={halo} />
      {commander && (
        <mesh ref={ring} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[radius * 2.3, 0.012, 8, 90]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      )}
      <primitive object={labelSprite} position={[0, radius + 0.55, 0]} />
    </group>
  );
}

/* ── Particle stream along a curve ────────────────────────── */

type StreamProps = {
  curve: THREE.CatmullRomCurve3;
  color: string;
  count?: number;
  speed?: number;
  particleSize?: number;
};

function ParticleStream({ curve, color, count = 26, speed = 0.09, particleSize = 0.05 }: StreamProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count + Math.random() * 0.02) % 1),
    [count]
  );
  const sizes = useMemo(
    () => offsets.map(() => particleSize * (0.7 + Math.random() * 0.6)),
    [offsets, particleSize]
  );
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.014, 6, false), [curve]);
  const geom = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const time = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const t = (offsets[i] + time * speed) % 1;
      dummy.position.copy(curve.getPointAt(t));
      dummy.scale.setScalar(sizes[i]);
      dummy.rotation.set(time * 1.6 + i, time * 1.2, 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <instancedMesh ref={mesh} args={[geom, mat, count]} frustumCulled={false} />
    </group>
  );
}

/* ── Local / cloud zone split ─────────────────────────────── */

function ZoneSeparator() {
  const localLabel = useMemo(
    () => makeLabelSprite("⟨ local zone · ollama on-prem · ₹0 marginal ⟩", "#5F93FF", 0.26),
    []
  );
  const cloudLabel = useMemo(
    () => makeLabelSprite("⟨ cloud zone · aws / azure ⟩", "#6c7789", 0.26),
    []
  );
  return (
    <group position={[0, NODES.groundY + 0.02, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 0.07]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[34, 0.22]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.08} toneMapped={false} />
      </mesh>
      <primitive object={localLabel} position={[0, 0.4, -3.6]} />
      <primitive object={cloudLabel} position={[0, 0.4, 3.6]} />
    </group>
  );
}

/* ── Ambient dust ─────────────────────────────────────────── */

function DustField({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 16 - 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        size={0.035}
        color="#5F93FF"
        transparent
        opacity={0.32}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

/* ── Scroll-driven activity states ────────────────────────── */

const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const scriptActivity = () =>
  Math.max(
    0.5 + 0.5 * Math.sin(performance.now() * 0.0006),
    smoothstep(scrollState.archProgress, 0.5, 0.62) * (1 - smoothstep(scrollState.archProgress, 0.72, 0.8))
  );

const videoActivity = () =>
  Math.max(
    0.5 + 0.5 * Math.sin(performance.now() * 0.0006 + Math.PI),
    smoothstep(scrollState.archProgress, 0.72, 0.84) * (1 - smoothstep(scrollState.archProgress, 0.94, 1))
  );

const commanderActivity = () =>
  Math.max(
    0.35,
    smoothstep(scrollState.archProgress, 0.05, 0.25) * (1 - smoothstep(scrollState.archProgress, 0.4, 0.55))
  );

/* ── Camera rig: the camera travels through the system ────── */

type V3 = [number, number, number];

// Ambient journey (outside the Architecture dive): hero → drift → work → outro
const AMBIENT_FRAMES: { pos: V3; look: V3 }[] = [
  { pos: [8.6, 3.4, 9.6], look: [-2.0, 1.8, 0] }, // hero — graph right of the headline
  { pos: [-10.5, 2.6, 8.5], look: [0, 0.6, 0] }, // drift — far side orbit
  { pos: [9.5, 0.8, 7.8], look: [0, -0.4, 0] }, // work — pull back out
  { pos: [5.5, 4.6, 11.5], look: [0, 0.9, 0] }, // outro — calm rise
];

// The dive: archProgress 0→1 sweeps intel → commander → directives → local zone → output
const DIVE_FRAMES: { t: number; pos: V3; look: V3 }[] = [
  { t: 0.0, pos: [-6.4, 5.6, 5.2], look: [-3.6, 4.4, 2.2] },
  { t: 0.22, pos: [2.6, 6.6, 4.6], look: [0, 5.1, 0.6] },
  { t: 0.45, pos: [1.9, 3.5, 3.6], look: [0, 2.1, 1.6] },
  { t: 0.68, pos: [0, 1.4, 0.2], look: [0, -0.9, -2.7] },
  { t: 0.88, pos: [2.4, -1.6, 1.8], look: [0, -3.7, 1.9] },
  { t: 1.0, pos: [4.6, -0.4, 5.4], look: [0, -1.4, 0] },
];

function lerpV3(a: V3, b: V3, t: number, out: THREE.Vector3) {
  out.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
}

function CameraRig() {
  const { camera } = useThree();
  const dampedPos = useRef(new THREE.Vector3(8.6, 3.4, 9.6));
  const dampedLook = useRef(new THREE.Vector3(-2, 1.8, 0));
  const ambientPos = useMemo(() => new THREE.Vector3(), []);
  const ambientLook = useMemo(() => new THREE.Vector3(), []);
  const divePos = useMemo(() => new THREE.Vector3(), []);
  const diveLook = useMemo(() => new THREE.Vector3(), []);
  const parallax = useRef({ x: 0, y: 0 });

  useFrame((_, dt) => {
    const g = scrollState.progress;
    const ch = scrollState.chapters;
    const ease = (x: number) => x * x * (3 - 2 * x);

    // Ambient track: 0→1 within each span between chapters (architecture span holds)
    let fi = 0;
    let ft = 0;
    if (g <= ch.drift[0]) {
      fi = 0; ft = 0;
    } else if (g <= ch.architecture[0]) {
      fi = 0;
      ft = ease((g - ch.drift[0]) / Math.max(0.0001, ch.architecture[0] - ch.drift[0]));
    } else if (g <= ch.architecture[1]) {
      fi = 1; ft = 1; // hold while the dive owns the camera
    } else if (g <= ch.work[0]) {
      fi = 1;
      ft = ease((g - ch.architecture[1]) / Math.max(0.0001, ch.work[0] - ch.architecture[1]));
    } else if (g <= ch.work[1]) {
      fi = 2;
      ft = ease((g - ch.work[0]) / Math.max(0.0001, ch.work[1] - ch.work[0]));
    } else {
      fi = 2; ft = 1;
    }
    const f0 = AMBIENT_FRAMES[fi];
    const f1 = AMBIENT_FRAMES[Math.min(fi + 1, AMBIENT_FRAMES.length - 1)];
    lerpV3(f0.pos, f1.pos, ft, ambientPos);
    lerpV3(f0.look, f1.look, ft, ambientLook);

    // Dive track from the architecture section's own progress
    const ap = Math.min(1, Math.max(0, scrollState.archProgress));
    let di = DIVE_FRAMES.length - 2;
    for (let i = 0; i < DIVE_FRAMES.length - 1; i++) {
      if (ap <= DIVE_FRAMES[i + 1].t) {
        di = i;
        break;
      }
    }
    const d0 = DIVE_FRAMES[di];
    const d1 = DIVE_FRAMES[di + 1];
    const dtT = ease((ap - d0.t) / Math.max(0.0001, d1.t - d0.t));
    lerpV3(d0.pos, d1.pos, dtT, divePos);
    lerpV3(d0.look, d1.look, dtT, diveLook);

    // Blend ambient ↔ dive across the architecture chapter (soft in/out)
    const span = Math.max(0.0001, ch.architecture[1] - ch.architecture[0]);
    const w =
      smoothstep(g, ch.architecture[0], ch.architecture[0] + span * 0.2) *
      (1 - smoothstep(g, ch.architecture[1] - span * 0.16, ch.architecture[1]));

    const targetX = ambientPos.x + (divePos.x - ambientPos.x) * w;
    const targetY = ambientPos.y + (divePos.y - ambientPos.y) * w;
    const targetZ = ambientPos.z + (divePos.z - ambientPos.z) * w;
    const lookX = ambientLook.x + (diveLook.x - ambientLook.x) * w;
    const lookY = ambientLook.y + (diveLook.y - ambientLook.y) * w;
    const lookZ = ambientLook.z + (diveLook.z - ambientLook.z) * w;

    // Gentle pointer parallax
    parallax.current.x += (pointerState.x - parallax.current.x) * Math.min(1, dt * 3);
    parallax.current.y += (pointerState.y - parallax.current.y) * Math.min(1, dt * 3);

    const k = 1 - Math.exp(-dt * 3.2);
    dampedPos.current.lerp(
      tmpVec.set(targetX + parallax.current.x * 0.7, targetY + parallax.current.y * 0.45, targetZ),
      k
    );
    dampedLook.current.lerp(tmpVec2.set(lookX, lookY, lookZ), k);
    camera.position.copy(dampedPos.current);
    camera.lookAt(dampedLook.current);
  });

  return null;
}

const tmpVec = new THREE.Vector3();
const tmpVec2 = new THREE.Vector3();

/* ── Scene ────────────────────────────────────────────────── */

function SceneContents() {
  const streams = useMemo(
    () => [
      { curve: bowCurve(NODES.trigger, NODES.commander, 0.9, 0.3), color: SIGNAL, speed: 0.07, size: 0.05 },
      { curve: bowCurve(NODES.commander, NODES.orchestrator, 0.45, 0.1), color: COMMANDER, speed: 0.11, size: 0.062 }, // directives.json
      { curve: bowCurve(NODES.orchestrator, NODES.script, 0.5, -0.2), color: SIGNAL, speed: 0.09, size: 0.05 },
      { curve: bowCurve(NODES.orchestrator, NODES.video, -0.5, -0.2), color: SIGNAL, speed: 0.09, size: 0.05 },
      { curve: bowCurve(NODES.script, NODES.output, 0.7, -0.25), color: SIGNAL, speed: 0.08, size: 0.05 },
      { curve: bowCurve(NODES.video, NODES.output, -0.7, -0.25), color: SIGNAL, speed: 0.08, size: 0.05 },
    ],
    []
  );

  return (
    <>
      <CameraRig />

      {/* Cloud zone — sparse, dim */}
      <Grid
        position={[0, NODES.groundY, 3.2]}
        cellSize={1.6}
        cellThickness={0.55}
        cellColor="#232b3a"
        sectionSize={6.4}
        sectionThickness={0.9}
        sectionColor="#2a3241"
        fadeDistance={30}
        fadeStrength={2.2}
        infiniteGrid
      />
      {/* Local zone — denser, signal-tinted */}
      <Grid
        position={[0, NODES.groundY, -3.2]}
        cellSize={0.8}
        cellThickness={0.55}
        cellColor={SIGNAL_DIM}
        sectionSize={3.2}
        sectionThickness={0.9}
        sectionColor={SIGNAL}
        fadeDistance={30}
        fadeStrength={2.4}
        infiniteGrid
      />
      <ZoneSeparator />

      {/* Pipeline nodes — mirrors the documented SCA pipeline 1:1 */}
      <SystemNode position={NODES.trigger} color={SIGNAL} radius={0.22} label="Market Intel" />
      <SystemNode
        position={NODES.commander}
        color={COMMANDER}
        radius={0.55}
        label="Claude Opus · Supreme Commander"
        commander
        activity={commanderActivity}
      />
      <SystemNode position={NODES.orchestrator} color={SIGNAL} radius={0.34} label="n8n Orchestrator" />
      <SystemNode position={NODES.script} color={SIGNAL} radius={0.4} label="Qwen Script Agent · Local" activity={scriptActivity} />
      <SystemNode position={NODES.video} color={SIGNAL} radius={0.4} label="Qwen Video Agent · Local" activity={videoActivity} />
      <SystemNode position={NODES.output} color={SIGNAL} radius={0.24} label="Published Output" />

      {streams.map((s, i) => (
        <ParticleStream key={i} curve={s.curve} color={s.color} speed={s.speed} particleSize={s.size} />
      ))}

      <DustField />
      <color attach="background" args={[BASE]} />
      <fog attach="fog" args={[BASE, 15, 36]} />
    </>
  );
}

export default function CommanderScene() {
  return (
    <Canvas
      camera={{ fov: 42, near: 0.1, far: 60, position: [8.6, 3.4, 9.6] }}
      dpr={[1, 1.75]}
      flat
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: true,
      }}
    >
      <SceneContents />
    </Canvas>
  );
}
