import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll('.reveal-hidden')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
