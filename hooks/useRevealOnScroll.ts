
import { useEffect, useRef } from 'react';

export const useRevealOnScroll = <T extends HTMLElement,>() => {
  const elementsRef = useRef<Map<T, IntersectionObserver>>(new Map());

  useEffect(() => {
    const observers = elementsRef.current;
    
    return () => {
        // Disconnect all observers on cleanup
        observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const addElement = (el: T | null) => {
    if (el && !elementsRef.current.has(el)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            elementsRef.current.delete(el); // Clean up after observation
          }
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(el);
      elementsRef.current.set(el, observer);
    }
  };
  
  return addElement;
};

// Add this CSS to a global style or within a style tag in index.html if you prefer
/*
@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
.reveal {
  opacity: 0;
  will-change: opacity, transform;
}
.reveal.visible { 
  animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
*/
