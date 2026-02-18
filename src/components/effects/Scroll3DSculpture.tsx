'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import type { MutableRefObject } from 'react';
import {
  BackSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Vector3,
} from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  LENIS_SCROLL_EVENT,
  type LenisScrollDetail,
} from '@/components/providers/SmoothScrollProvider';

const POINTER_COARSE_QUERY = '(pointer: coarse)';

function subscribePointerCoarse(callback: () => void): () => void {
  if (typeof globalThis.matchMedia !== 'function') return () => {};
  const mediaQuery = globalThis.matchMedia(POINTER_COARSE_QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getPointerCoarseSnapshot(): boolean {
  if (typeof globalThis.matchMedia !== 'function') return false;
  return globalThis.matchMedia(POINTER_COARSE_QUERY).matches;
}

function getPointerCoarseServerSnapshot(): boolean {
  return false;
}

function supportsWebGLContext(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');

    return Boolean(
      canvas.getContext('webgl2', { powerPreference: 'high-performance' }) ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

function getNativeScrollProgress(): number {
  const doc = document.documentElement;
  const limit = Math.max(doc.scrollHeight - window.innerHeight, 1);
  return MathUtils.clamp(window.scrollY / limit, 0, 1);
}

type GlassSculptureProps = {
  targetProgress: MutableRefObject<number>;
};

function GlassSculpture({ targetProgress }: GlassSculptureProps) {
  const groupRef = useRef<Group>(null);
  const coreMaterialRef = useRef<MeshPhysicalMaterial>(null);
  const rimMaterialRef = useRef<MeshBasicMaterial>(null);
  const ringPrimaryRef = useRef<Mesh>(null);
  const ringSecondaryRef = useRef<Mesh>(null);
  const smoothProgressRef = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const smoothProgress = MathUtils.damp(
      smoothProgressRef.current,
      targetProgress.current,
      4.8,
      delta
    );
    smoothProgressRef.current = smoothProgress;

    const centered = smoothProgress * 2 - 1;
    const breathing = Math.sin(state.clock.elapsedTime * 0.24) * 0.02;

    const targetRotationY = centered * 0.5 + breathing * 0.24;
    const targetRotationX = -0.08 + centered * 0.14;
    const targetPositionX = 1.22 + centered * 0.16;
    const targetPositionY = 0.04 - centered * 0.16 + breathing * 0.2;

    group.rotation.y = MathUtils.damp(group.rotation.y, targetRotationY, 5.2, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, targetRotationX, 4.8, delta);
    group.position.x = MathUtils.damp(group.position.x, targetPositionX, 4.6, delta);
    group.position.y = MathUtils.damp(group.position.y, targetPositionY, 4.6, delta);

    if (ringPrimaryRef.current) {
      ringPrimaryRef.current.rotation.z += delta * 0.08;
    }

    if (ringSecondaryRef.current) {
      ringSecondaryRef.current.rotation.z -= delta * 0.05;
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.envMapIntensity =
        0.52 + Math.sin(state.clock.elapsedTime * 0.31) * 0.04;
    }

    if (rimMaterialRef.current) {
      rimMaterialRef.current.opacity =
        0.065 + Math.sin(state.clock.elapsedTime * 0.34) * 0.006;
    }
  });

  return (
    <group ref={groupRef} position={[1.22, 0.04, 0]}>
      <mesh>
        <sphereGeometry args={[0.72, 64, 64]} />
        <meshPhysicalMaterial
          ref={coreMaterialRef}
          color="#dbe3ff"
          metalness={0.02}
          roughness={0.08}
          transmission={0.95}
          thickness={1.12}
          ior={1.24}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationDistance={1.2}
          attenuationColor="#7081ff"
          envMapIntensity={0.52}
        />
      </mesh>

      <mesh ref={ringPrimaryRef} rotation={[1.08, 0.14, 0.34]}>
        <torusGeometry args={[1.14, 0.082, 28, 140]} />
        <meshPhysicalMaterial
          color="#8b9dff"
          metalness={0.03}
          roughness={0.1}
          transmission={0.93}
          thickness={0.78}
          ior={1.21}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationDistance={1}
          attenuationColor="#6d7dff"
          envMapIntensity={0.48}
        />
      </mesh>

      <mesh ref={ringSecondaryRef} rotation={[0.52, 1.08, 0.62]}>
        <torusGeometry args={[0.92, 0.052, 24, 120]} />
        <meshPhysicalMaterial
          color="#f1b3dc"
          metalness={0.02}
          roughness={0.12}
          transmission={0.92}
          thickness={0.52}
          ior={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={0.86}
          attenuationColor="#f08aca"
          envMapIntensity={0.42}
        />
      </mesh>

      <mesh rotation={[1.08, 0.14, 0.34]} scale={1.015}>
        <torusGeometry args={[1.14, 0.098, 16, 120]} />
        <meshBasicMaterial
          ref={rimMaterialRef}
          color="#ff8bd5"
          transparent
          opacity={0.065}
          depthWrite={false}
          toneMapped={false}
          side={BackSide}
        />
      </mesh>
    </group>
  );
}

function getShipPathPoint(phase: number, time: number, out: Vector3): Vector3 {
  const x = Math.sin(phase) * 2.35;
  const y =
    Math.cos(phase * 1.4) * 0.78 +
    Math.sin(phase * 0.45 + time * 0.25) * 0.18;
  const z = -0.62 + Math.sin(phase * 2.1 + 0.4) * 0.28;

  out.set(x, y, z);
  return out;
}

function AlienShip({ targetProgress }: GlassSculptureProps) {
  const shipRef = useRef<Group>(null);
  const bodyRef = useRef<Group>(null);
  const glowRef = useRef<MeshBasicMaterial>(null);
  const smoothProgressRef = useRef(0);
  const pathNow = useMemo(() => new Vector3(), []);
  const pathAhead = useMemo(() => new Vector3(), []);
  const tangent = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const ship = shipRef.current;
    const body = bodyRef.current;
    if (!ship || !body) return;

    const smoothProgress = MathUtils.damp(
      smoothProgressRef.current,
      targetProgress.current,
      4.6,
      delta
    );
    smoothProgressRef.current = smoothProgress;

    const phase = smoothProgress * Math.PI * 2;
    const aheadPhase = phase + 0.035;
    getShipPathPoint(phase, state.clock.elapsedTime, pathNow);
    getShipPathPoint(aheadPhase, state.clock.elapsedTime, pathAhead);

    ship.position.x = MathUtils.damp(ship.position.x, pathNow.x, 5, delta);
    ship.position.y = MathUtils.damp(ship.position.y, pathNow.y, 5, delta);
    ship.position.z = MathUtils.damp(ship.position.z, pathNow.z, 5, delta);

    ship.lookAt(pathAhead);
    ship.rotateY(Math.PI / 2);

    tangent.subVectors(pathAhead, pathNow).normalize();
    const bankTarget = MathUtils.clamp(-tangent.y * 0.55, -0.28, 0.28);
    body.rotation.z = MathUtils.damp(body.rotation.z, bankTarget, 5.2, delta);
    body.rotation.x = MathUtils.damp(
      body.rotation.x,
      Math.sin(state.clock.elapsedTime * 1.1) * 0.04,
      4.2,
      delta
    );

    if (glowRef.current) {
      glowRef.current.opacity =
        0.1 + Math.sin(state.clock.elapsedTime * 2.6 + phase) * 0.03;
    }
  });

  return (
    <group ref={shipRef} scale={0.33}>
      <group ref={bodyRef}>
        <mesh position={[0, 0.01, 0]} scale={[1, 0.28, 1]}>
          <sphereGeometry args={[1.24, 48, 36]} />
          <meshPhysicalMaterial
            color="#79dfc9"
            metalness={0.09}
            roughness={0.16}
            transmission={0.9}
            thickness={0.58}
            ior={1.18}
            clearcoat={1}
            clearcoatRoughness={0.12}
            attenuationDistance={0.86}
            attenuationColor="#4db29d"
            envMapIntensity={0.45}
          />
        </mesh>

        <mesh position={[0, -0.12, 0]} scale={[0.76, 0.32, 0.76]}>
          <sphereGeometry args={[1.08, 42, 30]} />
          <meshPhysicalMaterial
            color="#6dcfba"
            metalness={0.08}
            roughness={0.2}
            transmission={0.88}
            thickness={0.52}
            ior={1.18}
            clearcoat={1}
            clearcoatRoughness={0.14}
            attenuationDistance={0.84}
            attenuationColor="#53b7a3"
            envMapIntensity={0.4}
          />
        </mesh>

        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.43, 34, 26, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#ffd59f"
            metalness={0.04}
            roughness={0.12}
            transmission={0.93}
            thickness={0.44}
            ior={1.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationDistance={0.72}
            attenuationColor="#ffb779"
            envMapIntensity={0.42}
          />
        </mesh>

        <mesh position={[0, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.19, 0.05, 14, 80]} />
          <meshBasicMaterial
            ref={glowRef}
            color="#8df0d5"
            transparent
            opacity={0.1}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, -0.25, 0]}>
          <coneGeometry args={[0.4, 0.95, 22, 1, true]} />
          <meshBasicMaterial
            color="#ffd9a6"
            transparent
            opacity={0.045}
            toneMapped={false}
            depthWrite={false}
            side={BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Scroll3DSculpture() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useSyncExternalStore(
    subscribePointerCoarse,
    getPointerCoarseSnapshot,
    getPointerCoarseServerSnapshot
  );

  const webglSupported = useMemo(() => supportsWebGLContext(), []);
  const targetProgress = useRef(0);

  useEffect(() => {
    if (!webglSupported) return;

    const handleNativeScroll = () => {
      targetProgress.current = getNativeScrollProgress();
    };

    const handleLenisScroll = (event: Event) => {
      const detail = (event as CustomEvent<LenisScrollDetail>).detail;
      if (!detail) return;
      targetProgress.current = MathUtils.clamp(detail.progress, 0, 1);
    };

    handleNativeScroll();

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleNativeScroll);
    window.addEventListener(LENIS_SCROLL_EVENT, handleLenisScroll as EventListener);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleNativeScroll);
      window.removeEventListener(
        LENIS_SCROLL_EVENT,
        handleLenisScroll as EventListener
      );
    };
  }, [webglSupported]);

  if (reducedMotion || coarsePointer || !webglSupported) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 0.56 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.8], fov: 35, near: 0.1, far: 20 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        fallback={null}
      >
        <ambientLight intensity={0.2} color="#eff2ff" />
        <directionalLight position={[3.5, 2.6, 4.2]} intensity={0.48} color="#f1f4ff" />
        <pointLight position={[-2.4, -1.2, 2.8]} intensity={0.16} color="#7788ff" />
        <pointLight position={[2.2, 1.4, 2.1]} intensity={0.12} color="#f28ccf" />

        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <GlassSculpture targetProgress={targetProgress} />
        <AlienShip targetProgress={targetProgress} />
      </Canvas>
    </div>
  );
}
