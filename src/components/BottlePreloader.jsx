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
      
      {/* Ensure Keyframes are available */}
      <style>
        {`
          @keyframes rise-liquid {
            0% { height: 0%; }
            100% { height: 75%; } /* Filled to neck */
          }
          @keyframes surface-wobble {
            0%, 100% { transform: skewX(0deg); }
            50% { transform: skewX(-2deg); }
          }
          @keyframes speck-rise {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
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
            </defs>

            <use href="#bottle-shape" fill="rgba(255,255,255,0.2)" />

            <g clipPath="url(#bottle-clip)">
              <foreignObject x="0" y="0" width="100" height="200">
                {/* SAFARI FIX: 
                   1. Removed 'flex flex-col justify-end' 
                   2. Added 'relative' to parent
                   3. Added 'absolute bottom-0' to child
                   This forces the liquid to anchor to the bottom in all browsers.
                */}
                <div className="w-full h-full relative">
                    <div className="absolute bottom-0 left-0 w-full bg-pink-400"
                         style={{ animation: 'rise-liquid 2.5s ease-out forwards 0.5s', height: '0%' }}>
                        
                        {/* Inner Details */}
                        <div className="absolute inset-0 w-full h-full opacity-60"
                             style={{ backgroundImage: 'radial-gradient(#be185d 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                        <div className="absolute top-0 left-0 w-full h-2 bg-pink-300 opacity-50 blur-[1px]"
                             style={{ animation: 'surface-wobble 3s infinite ease-in-out' }}></div>
                        
                        {/* Bubbles */}
                        <div className="absolute bottom-10 left-4 w-1 h-1 bg-rose-700 rounded-full" style={{ animation: 'speck-rise 4s infinite' }}></div>
                        <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-rose-800 rounded-full" style={{ animation: 'speck-rise 3s infinite 0.5s' }}></div>
                        <div className="absolute bottom-5 left-16 w-1 h-1 bg-rose-600 rounded-full" style={{ animation: 'speck-rise 5s infinite 1s' }}></div>
                    </div>
                </div>
              </foreignObject>
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