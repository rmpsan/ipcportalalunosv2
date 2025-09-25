import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  // FIX: Initialize useRef with null to avoid "Expected 1 argument" error in some environments.
  const requestRef = useRef<number | null>(null);
  // FIX: Initialize useRef with null to avoid "Expected 1 argument" error.
  const previousTimeRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };

    const animate = (time: number) => {
        // FIX: Check against null since we initialized with null.
        if (previousTimeRef.current !== null) {
            const deltaTime = time - previousTimeRef.current;
            lastMousePos.current.x += (mousePos.current.x - lastMousePos.current.x) * 0.1 * deltaTime * 0.1;
            lastMousePos.current.y += (mousePos.current.y - lastMousePos.current.y) * 0.1 * deltaTime * 0.1;

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate3d(${lastMousePos.current.x - 16}px, ${lastMousePos.current.y - 16}px, 0)`;
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }
    
    requestRef.current = requestAnimationFrame(animate);

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input[type="submit"], .cursor-pointer')) {
        cursorOutlineRef.current?.classList.add('scale-150', 'opacity-20');
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input[type="submit"], .cursor-pointer')) {
        cursorOutlineRef.current?.classList.remove('scale-150', 'opacity-20');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      // FIX: Check against null for consistency.
      if(requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return { cursorDotRef, cursorOutlineRef };
};
