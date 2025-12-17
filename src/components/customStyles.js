const customStyles = `
  html { scroll-behavior: smooth; }

  /* --- BOTTLE & LIQUID ANIMATIONS --- */
  @keyframes rise-liquid {
    0% { height: 0%; }
    100% { height: 85%; }
  }
  @keyframes surface-wobble {
    0% { transform: skewX(0deg); }
    25% { transform: skewX(-2deg); }
    75% { transform: skewX(2deg); }
    100% { transform: skewX(0deg); }
  }
  @keyframes straw-entry {
    0% { transform: translateY(-400px) rotate(15deg); opacity: 0; }
    60% { transform: translateY(10px) rotate(8deg); opacity: 1; }
    80% { transform: translateY(-15px) rotate(8deg); }
    100% { transform: translateY(0) rotate(8deg); opacity: 1; }
  }
  @keyframes speck-rise {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-120px) scale(0); opacity: 0; }
  }
  @keyframes drift {
    0% { transform: translateX(0) translateY(0) rotate(-5deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(100vw) translateY(-50px) rotate(360deg); opacity: 0; }
  }
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  @keyframes liquid-pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
    70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(236, 72, 153, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
  }
  @keyframes bottle-enter {
    0% { opacity: 0; transform: translateY(100px) rotate(-10deg) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) rotate(3deg) scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  /* UTILITY CLASSES */
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-liquid-pulse { animation: liquid-pulse 2s infinite; }
  .animate-bottle-enter { animation: bottle-enter 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; animation-delay: 0.2s; }
  
  .shimmer-btn { background: linear-gradient(to right, #ec4899 4%, #f472b6 25%, #ec4899 36%); background-size: 1000px 100%; animation: shimmer 3s infinite linear; }
  
  .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.4); }
  .glass-card { background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 8px 32px 0 rgba(236, 72, 153, 0.1); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .glass-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.25); border-color: #f9a8d4; }
  .glass-input { background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255, 255, 255, 0.5); backdrop-filter: blur(5px); transition: all 0.3s ease; }
  .glass-input:focus { background: rgba(255, 255, 255, 0.9); border-color: #ec4899; box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.15); }
  
  .reveal-hidden { opacity: 0; transform: translateY(40px); transition: all 1s ease-out; }
  .reveal-visible { opacity: 1; transform: translateY(0); }
`;

export default customStyles;
