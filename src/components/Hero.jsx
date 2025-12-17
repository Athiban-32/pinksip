import React, { useState } from 'react';
import { Star, ShoppingBag, ArrowRight, Droplet, Heart, CheckCircle2 } from 'lucide-react';
import roseMilkImg from '../assets/rosemilk.jpg';

// Animation Components (Kept same as your original)
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
    <div className={`text-pink-300 transform rotate-45 drop-shadow-sm`} style={{ fontSize: `${size}px` }}>🪷</div>
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
    <section id="home" onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden bg-[#FFF9FA]">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-float" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-float" style={{ animationDelay: '2s', transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}></div>
        
        {/* Petals */}
        <FloatingPetal delay={0} duration={15} size={24} top={20} />
        <FloatingPetal delay={5} duration={18} size={32} top={60} />
        <FloatingPetal delay={2} duration={20} size={20} top={40} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* TEXT CONTENT */}
          <div className="flex-1 text-center md:text-left space-y-8" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 text-pink-700 font-medium text-xs md:text-sm uppercase tracking-widest shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Star size={14} className="fill-pink-500 text-pink-500" /> 
              <span>Authentic Rose Milk</span>
            </div>

            {/* Main Heading - Using Serif for 'The Brew' to make it classy */}
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1] tracking-tight">
                The Brew
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700">
                  Real Paneer Rose <br className="hidden md:block" />
                  <span className="italic font-light">Pure Bliss.</span>
                </span>
              </h2>
            </div>

            {/* Description - More descriptive and sensory */}
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-sans font-light">
              Experience the velvety richness of farm-fresh milk infused with the aromatic essence of <b>native Paneer Roses</b>. No artificial syrups—just the timeless taste of tradition in every chilled sip.
            </p>

            {/* Trust Badges (Mini) */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500"/> No Preservatives</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500"/> 100% Natural</div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <a href="#contact" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-300/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 cursor-pointer group">
                <ShoppingBag size={20} className="group-hover:animate-bounce" /> 
                Order Now
              </a>
              <a href="#products" className="group bg-white hover:bg-pink-50 text-gray-800 hover:text-pink-700 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 hover:border-pink-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg cursor-pointer">
                Our Menu <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="flex-1 relative flex justify-center items-center mt-8 md:mt-0">
            {/* Spinning Ring */}
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border-[1px] border-pink-200/60 rounded-full animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] border-[1px] border-dashed border-pink-300/40 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

            <div className="relative z-20" style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}>
                <div className="relative group perspective-1000">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full blur-[70px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <img src={roseMilkImg} 
                    alt="The Brew Premium Rose Milk" 
                    className="animate-bottle-enter relative w-64 md:w-80 lg:w-96 h-auto object-cover rounded-3xl shadow-[0_20px_50px_-12px_rgba(255,100,150,0.3)] transform transition-all duration-700 ease-out hover:scale-105 hover:rotate-2"
                    // Removed the heavy mask to show off the bottle more, kept a subtle rounded look
                  />

                  {/* Floating 'Fresh' Card */}
                  <div className="absolute top-8 -right-6 md:-right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pink-100 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                        <div className="bg-pink-100 p-2.5 rounded-full text-pink-600"><Droplet size={20} fill="currentColor" /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Freshness</p>
                          <p className="text-sm font-bold text-gray-900">Farm Fresh Milk</p>
                        </div>
                    </div>
                  </div>

                  {/* Floating 'Love' Card */}
                  <div className="absolute bottom-12 -left-6 md:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pink-100 animate-float" style={{ animationDelay: '2.5s' }}>
                    <div className="flex items-center gap-3">
                        <div className="bg-rose-100 p-2.5 rounded-full text-rose-600"><Heart size={20} fill="currentColor" /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Made with</p>
                          <p className="text-sm font-bold text-gray-900">Real Love</p>
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