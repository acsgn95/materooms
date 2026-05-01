'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  '/background/1.jpg',
  '/background/2.jpg',
  '/background/3.jpg',
  '/background/4.jpg',
  '/background/5.jpg',
  '/background/6.jpg',
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
