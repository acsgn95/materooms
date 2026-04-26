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
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % images.length);
        setNext((n) => (n + 1) % images.length);
        setTransitioning(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Current image */}
      <img
        src={images[current]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: transitioning ? 0 : 1 }}
      />
      {/* Next image (preloaded underneath) */}
      <img
        src={images[next]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: transitioning ? 1 : 0, transition: 'opacity duration-1000' }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
