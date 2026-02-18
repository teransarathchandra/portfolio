'use client';

import dynamic from 'next/dynamic';

const Scroll3DSculpture = dynamic(
  () => import('@/components/effects/Scroll3DSculpture'),
  { ssr: false }
);

export default function Scroll3DSculptureMount() {
  return <Scroll3DSculpture />;
}
