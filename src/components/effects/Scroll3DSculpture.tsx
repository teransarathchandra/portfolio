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
          color="#e6eaee"
          metalness={0.02}
          roughness={0.08}
          transmission={0.95}
          thickness={1.12}
          ior={1.24}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationDistance={1.2}
          attenuationColor="#d5e4dd"
          envMapIntensity={0.52}
        />
      </mesh>

      <mesh ref={ringPrimaryRef} rotation={[1.08, 0.14, 0.34]}>
        <torusGeometry args={[1.14, 0.082, 28, 140]} />
        <meshPhysicalMaterial
          color="#dfe4ea"
          metalness={0.03}
          roughness={0.1}
          transmission={0.93}
          thickness={0.78}
          ior={1.21}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationDistance={1}
          attenuationColor="#d1dce8"
          envMapIntensity={0.48}
        />
      </mesh>

      <mesh ref={ringSecondaryRef} rotation={[0.52, 1.08, 0.62]}>
        <torusGeometry args={[0.92, 0.052, 24, 120]} />
        <meshPhysicalMaterial
          color="#f0f2f5"
          metalness={0.02}
          roughness={0.12}
          transmission={0.92}
          thickness={0.52}
          ior={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={0.86}
          attenuationColor="#dae0e7"
          envMapIntensity={0.42}
        />
      </mesh>

      <mesh rotation={[1.08, 0.14, 0.34]} scale={1.015}>
        <torusGeometry args={[1.14, 0.098, 16, 120]} />
        <meshBasicMaterial
          ref={rimMaterialRef}
          color="#c6ff00"
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
        <ambientLight intensity={0.2} color="#f5f5f5" />
        <directionalLight position={[3.5, 2.6, 4.2]} intensity={0.48} color="#f5f5f5" />
        <pointLight position={[-2.4, -1.2, 2.8]} intensity={0.14} color="#c6ff00" />

        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <GlassSculpture targetProgress={targetProgress} />
      </Canvas>
    </div>
  );
}
