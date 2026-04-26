'use client';

import { useEffect, useState } from 'react';

const images = [
  '/background/1.webp',
  '/background/2.webp',
  '/background/3.webp',
  '/background/4.jpg',
  '/background/5.jpg',
  '/background/6.webp',
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const next = (active + 1) % images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % images.length);
      setFading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [fading]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Alt katman: her zaman sıradaki görsel, opacity 1 */}
      <img
        src={images[next]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Üst katman: aktif görsel, fade out olunca alttaki görünür */}
      <img
        src={images[active]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
