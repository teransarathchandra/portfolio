'use client';

import dynamic from 'next/dynamic';

const StarMeshBackground = dynamic(
  () => import('@/components/effects/StarMeshBackground'),
  { ssr: false }
);

export default function StarMeshBackgroundMount() {
  return <StarMeshBackground />;
}
