import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  reverse?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.4, reverse = false } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const newOffset = reverse ? -scrollPosition * speed : scrollPosition * speed;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, reverse]);

  return { offset };
}
