import React, { useEffect } from 'react';
import paneerRoseSvg from '../assets/paneer_rose.png';

const FloatingPetal = ({ delay, duration, size, top }) => (
  <div
    className="absolute pointer-events-none z-0 opacity-60"
    style={{
      animation: `drift ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      top: `${top}%`,
      left: '-10%'
    }}
  >
    <img
        src={paneerRoseSvg}
        alt="Paneer Rose"
        className="transform rotate-45 drop-shadow-sm mix-blend-multiply"
        style={{ width: `${size}px`, height: 'auto' }}
    />
  </div>
);

const BottlePreloader = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 3800);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[100] bg-pink-50 flex flex-col items-center justify-center overflow-hidden">
      
      <style>
        {`
          /* SAFARI-SAFE ANIMATION:
             Instead of changing 'height', we scale the element up from 0 to 1.
             This works on all browsers' GPU engines.
          */
          @keyframes scale-liquid {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes bubble-rise {
            0% {
              transform: translateY(0) scale(0.5);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) scale(1.2);
              opacity: 0;
            }
          }
          
          .liquid-fill {
            /* These 3 lines are crucial for Safari compatibility */
            transform-box: fill-box;
            transform-origin: bottom; 
            transform: scaleY(0);
            
            animation: scale-liquid 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s;
          }

          .bubble {
            transform-box: fill-box;
            transform-origin: center;
          }
        `}
      </style>

      <div className="absolute inset-0 pointer-events-none w-full h-full">
          <FloatingPetal delay={0} duration={6} size={35} top={20} />
          <FloatingPetal delay={2} duration={8} size={25} top={80} />
          <FloatingPetal delay={1} duration={7} size={30} top={50} />
          <FloatingPetal delay={3.5} duration={9} size={20} top={10} />
          <FloatingPetal delay={0.5} duration={5} size={40} top={65} />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-8">
        <div className="relative w-[140px] h-[300px]">
          {/* Straw */}
          <div className="absolute top-[-50px] left-[52%] w-[14px] h-[360px] z-0 rounded-full shadow-sm"
               style={{
                 background: 'repeating-linear-gradient(45deg, #fce7f3, #fce7f3 10px, #ec4899 10px, #ec4899 20px)',
                 boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
                 animation: 'straw-entry 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                 transformOrigin: 'bottom center',
               }}>
          </div>

          <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl z-10 relative overflow-visible">
            <defs>
              <path id="bottle-shape" d="M 30 5 L 30 35 Q 30 65 10 85 L 10 185 Q 10 200 50 200 Q 90 200 90 185 L 90 85 Q 70 65 70 35 L 70 5 Z" />
              
              <clipPath id="bottle-clip">
                <use href="#bottle-shape" />
              </clipPath>

              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" /> 
                <stop offset="50%" stopColor="#ec4899" /> 
                <stop offset="100%" stopColor="#db2777" /> 
              </linearGradient>

              <pattern id="speckPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#881337" opacity="0.2" />
              </pattern>
            </defs>

            {/* Bottle Glass */}
            <use href="#bottle-shape" fill="rgba(255,255,255,0.2)" />

            {/* Liquid Group */}
            <g clipPath="url(#bottle-clip)">
                
                {/* SAFARI FIX: 
                   1. We set the height to the FULL amount (150px) immediately.
                   2. We position it at y=50 (the final top position).
                   3. We use the class 'liquid-fill' to ScaleY(0) -> ScaleY(1) from the bottom.
                */}
                <rect 
                  x="0" 
                  y="50" 
                  width="100" 
                  height="150" 
                  fill="url(#liquidGradient)" 
                  className="liquid-fill"
                />

                {/* Texture */}
                <rect 
                  x="0" 
                  y="50" 
                  width="100" 
                  height="150" 
                  fill="url(#speckPattern)" 
                  className="liquid-fill"
                  style={{ opacity: 0.6 }}
                />

                {/* Bubbles - Using standard opacity animation compatible with all browsers */}
                <g style={{ opacity: 0, animation: 'fade-in 0.5s forwards 1s' }}> 
                   <circle cx="30" cy="180" r="2" fill="#be185d" className="bubble" style={{ animation: 'bubble-rise 3s infinite ease-in 1s' }} />
                   <circle cx="60" cy="160" r="3" fill="#9d174d" className="bubble" style={{ animation: 'bubble-rise 4s infinite ease-in 1.5s' }} />
                   <circle cx="45" cy="190" r="1.5" fill="#be185d" className="bubble" style={{ animation: 'bubble-rise 2.5s infinite ease-in 2s' }} />
                   <circle cx="70" cy="170" r="2" fill="#be185d" className="bubble" style={{ animation: 'bubble-rise 3.5s infinite ease-in 0.8s' }} />
                </g>

                {/* Surface Line (Scaled with the liquid) */}
                <rect 
                  x="0" 
                  y="50" 
                  width="100" 
                  height="2" 
                  fill="#fbcfe8" 
                  className="liquid-fill" 
                  style={{ opacity: 0.8 }} 
                />
            </g>

            <path d="M 15 90 Q 15 120 15 180" fill="none" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <path d="M 85 90 Q 85 120 85 180" fill="none" stroke="white" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
            <path d="M 32 10 L 32 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            
            <use href="#bottle-shape" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
            
            <rect x="25" y="2" width="50" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            <rect x="25" y="2" width="50" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        <div className="mt-6 text-center">
           <h2 className="text-xl md:text-2xl font-bold text-pink-900 tracking-[0.2em] uppercase animate-pulse">
            Brewing Freshness...
           </h2>
        </div>
      </div>
    </div>
  );
};

export default BottlePreloader;