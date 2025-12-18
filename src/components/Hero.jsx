import React, { useState } from 'react';
import { Star, ShoppingBag, ArrowRight, Droplet, Heart, CheckCircle2 } from 'lucide-react';
import roseMilkImg from '../assets/rosemilk.jpg';
import paneerRoseSvg from '../assets/paneer_rose.png';

// --- STYLES & FONTS ---
// 1. Importing 'Dancing Script' (for The Brew) and 'Baloo 2' (Rounded font for text)
const animationStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Dancing+Script:wght@600;700&display=swap');

  /* The Script Font for Brand Name */
  .font-curvy {
    font-family: 'Dancing Script', cursive;
  }

  /* The New Rounded Font (Baloo 2) for "Real Paneer Rose" */
  .font-rounded {
    font-family: 'Baloo 2', sans-serif;
  }

  /* Wave animation for letters */
  @keyframes wave {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-5px) rotate(-2deg); }
    75% { transform: translateY(2px) rotate(2deg); }
  }

  .letter-wave {
    display: inline-block;
    animation: wave 2.5s ease-in-out infinite;
  }

  /* Soft Glow for "The Brew" */
  @keyframes pinkGlow {
    0%, 100% { 
      text-shadow: 2px 4px 12px rgba(236, 72, 153, 0.3);
      transform: scale(1);
    }
    50% { 
      text-shadow: 2px 4px 20px rgba(236, 72, 153, 0.6);
      transform: scale(1.02);
    }
  }

  .animate-glow-text {
    animation: pinkGlow 3s ease-in-out infinite;
  }
`;

// --- HELPER COMPONENT: WAVY TEXT ---
const WavyText = ({ text, className }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter-wave"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            marginRight: char === " " ? "0.25em" : "0"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// --- COMPONENTS ---

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
      alt="Rose Petal"
      className="transform rotate-45 drop-shadow-sm mix-blend-multiply" 
      style={{ width: `${size}px`, height: 'auto' }} 
    />
  </div>
);

const WaveSeparator = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
    </svg>
  </div>
);

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setMousePos({ x: (window.innerWidth - e.pageX) / 40, y: (window.innerHeight - e.pageY) / 40 });
  };

  return (
    // Updated Padding Here: pt-32 (Mobile), md:pt-40 (Laptop), lg:pt-48 (Big Screen)
    // This graduation ensures navbar clearance without pushing content too deep on laptops
    <section id="home" onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center pt-20 md:pt-28 lg:pt-39 pb-24 overflow-hidden bg-[#FFF9FA]">
      <style>{animationStyles}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-float" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-float" style={{ animationDelay: '2s', transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}></div>
        <FloatingPetal delay={0} duration={15} size={28} top={20} />
        <FloatingPetal delay={5} duration={18} size={36} top={60} />
        <FloatingPetal delay={2} duration={20} size={24} top={40} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* TEXT CONTENT */}
          <div className="flex-1 text-center md:text-left space-y-8" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-900 font-semibold text-xs tracking-widest uppercase">
              <Star size={12} className="fill-pink-900" /> 
              <span>Authentic Rosemilk</span>
            </div>

            <div className="space-y-1">
              {/* BRAND NAME: Dancing Script (Curvy & Glowing) */}
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-curvy font-bold text-pink-500 leading-[1.1] tracking-wide animate-glow-text -rotate-2 origin-left">
                The Brew
              </h1>
              
              {/* FLAVOR NAME: Baloo 2 (Rounded & Bubbly) */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-rounded font-extrabold leading-[1.2] mt-2 text-gray-900">
                 <WavyText text="Real Paneer Rose" className="text-pink-950" />
              </h2>
              
              {/* TAGLINE: Baloo 2 (Rounded) */}
              <p className="text-3xl font-rounded font-bold text-pink-500 italic mt-2">
                Pure Bliss.
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-sans font-light">
              Experience the velvety richness of farm-fresh milk infused with the aromatic essence of <b>native Paneer Roses</b>. No artificial syrups—just the timeless taste of tradition.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-pink-900/70 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-pink-600"/> No Preservatives</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-pink-600"/> 100% Natural</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="#contact" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-300/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 cursor-pointer">
                <ShoppingBag size={20} /> Order Now
              </a>
              <a href="#products" className="group text-pink-900 font-bold text-lg px-8 py-4 flex items-center justify-center gap-2 transition-all hover:tracking-wide">
                View Menu <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="flex-1 relative flex justify-center items-center mt-8 md:mt-6">
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-pink-200 rounded-full animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] border border-dashed border-pink-200 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

            <div className="relative z-20" style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}>
                <div className="relative group perspective-1000">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <img src={roseMilkImg} 
                    alt="The Brew Premium Rose Milk" 
                    className="animate-bottle-enter relative w-64 md:w-80 lg:w-96 h-auto object-cover rounded-3xl shadow-2xl transform transition-all duration-700 ease-out hover:scale-105 hover:rotate-2"
                  />

                  <div className="absolute top-8 -right-6 md:-right-12 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-pink-50 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                        <div className="bg-pink-50 p-2 rounded-full text-pink-600"><Droplet size={18} fill="currentColor" /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Purity</p>
                          <p className="text-sm font-bold text-pink-950">100% Real</p>
                        </div>
                    </div>
                  </div>

                  <div className="absolute bottom-12 -left-6 md:-left-12 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-pink-50 animate-float" style={{ animationDelay: '2.5s' }}>
                    <div className="flex items-center gap-3">
                        <div className="bg-pink-50 p-2 rounded-full text-pink-600"><Heart size={18} fill="currentColor" /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Made with</p>
                          <p className="text-sm font-bold text-pink-950">Love</p>
                        </div>
                    </div>
                  </div>

                </div>
            </div>
          </div>

        </div>
      </div>
      <WaveSeparator />
    </section>
  );
};

export default Hero;