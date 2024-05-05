'use client';
import { useEffect } from 'react';

const ObserverWrapper = () => {
  useEffect(() => {
    const basicAnimation = [
      'animate-once',
      'animate-ease-linear',
      'animate-fade-up',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains('animate-once')
          ) {
            entry.target.classList.add(...basicAnimation);
          }
          console.log(entry);
        });
      },
      {
        threshold: 0.1,
      }
    );
    document.querySelectorAll('[data-animate]').forEach((item) => {
      console.log(item);
      observer.observe(item);
    });
  });

  return null;
};

export default ObserverWrapper;
