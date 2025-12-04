import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Droplet, Heart, Snowflake, Instagram, ArrowRight, 
  ShoppingBag, Send, MapPin, Phone, Mail, Star, CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- CUSTOM STYLES & ANIMATIONS ---
const customStyles = `
  html { scroll-behavior: smooth; }

  /* --- BOTTLE & LIQUID ANIMATIONS --- */
  
  /* Liquid filling up from bottom */
  @keyframes rise-liquid {
    0% { height: 0%; }
    100% { height: 85%; } 
  }

  /* Gentle wave on top of liquid */
  @keyframes surface-wobble {
    0% { transform: skewX(0deg); }
    25% { transform: skewX(-2deg); }
    75% { transform: skewX(2deg); }
    100% { transform: skewX(0deg); }
  }

  /* Straw Drop Animation - adjusted to land perfectly */
  @keyframes straw-entry {
    0% { transform: translateY(-400px) rotate(15deg); opacity: 0; }
    60% { transform: translateY(10px) rotate(8deg); opacity: 1; } /* Hit bottom */
    80% { transform: translateY(-15px) rotate(8deg); } /* Bounce up */
    100% { transform: translateY(0) rotate(8deg); opacity: 1; } /* Settle */
  }

  /* Bubbles rising in the smoothie */
  @keyframes speck-rise {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-120px) scale(0); opacity: 0; }
  }

  /* --- GENERAL UI ANIMATIONS --- */
  
  /* Rose Petal Drift (Left to Right) */
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

// --- HOOKS ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.remove('reveal-hidden');
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- HELPER COMPONENT: FLOATING PETAL ---
const FloatingPetal = ({ delay, duration, size, top }) => (
  <div 
    className="absolute pointer-events-none z-0 opacity-60" 
    style={{ 
      animation: `drift ${duration}s linear infinite`, 
      animationDelay: `${delay}s`, 
      top: `${top}%`, 
      left: '-10%' // Start off-screen left
    }}
  >
    <div className={`text-pink-300 transform rotate-45 drop-shadow-sm`} style={{ fontSize: `${size}px` }}>🌸</div>
  </div>
);

// --- BOTTLE PRELOADER ---
const BottlePreloader = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 3800);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[100] bg-pink-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Ambience: RESTORED & ENHANCED PETALS */}
      <div className="absolute inset-0 pointer-events-none w-full h-full">
         <FloatingPetal delay={0} duration={6} size={30} top={20} />
         <FloatingPetal delay={2} duration={8} size={20} top={80} />
         <FloatingPetal delay={1} duration={7} size={25} top={50} />
         <FloatingPetal delay={3.5} duration={9} size={15} top={10} />
         <FloatingPetal delay={0.5} duration={5} size={35} top={65} />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-8">
        
        {/* BOTTLE COMPOSITION CONTAINER */}
        <div className="relative w-[140px] h-[300px]">
          
          {/* STRAW POSITIONING */}
          <div className="absolute top-[-50px] left-[52%] w-[14px] h-[360px] z-0 rounded-full shadow-sm"
               style={{
                 background: 'repeating-linear-gradient(45deg, #fce7f3, #fce7f3 10px, #ec4899 10px, #ec4899 20px)',
                 boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
                 animation: 'straw-entry 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                 transformOrigin: 'bottom center',
               }}>
          </div>

          {/* SVG BOTTLE STRUCTURE */}
          <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl z-10 relative overflow-visible">
            <defs>
              <path id="bottle-shape" d="M 30 5 L 30 35 Q 30 65 10 85 L 10 185 Q 10 200 50 200 Q 90 200 90 185 L 90 85 Q 70 65 70 35 L 70 5 Z" />
              <pattern id="specks" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#be185d" opacity="0.3" />
              </pattern>
              <clipPath id="bottle-clip">
                <use href="#bottle-shape" />
              </clipPath>
            </defs>

            {/* A. Background Glass Tint */}
            <use href="#bottle-shape" fill="rgba(255,255,255,0.2)" />

            {/* B. The Liquid (Masked) */}
            <g clipPath="url(#bottle-clip)">
              <foreignObject x="0" y="0" width="100" height="200">
                <div className="w-full h-full flex flex-col justify-end">
                   <div className="w-full bg-pink-400 relative"
                        style={{ animation: 'rise-liquid 2.5s ease-out forwards 0.5s', height: '0%' }}>
                        
                        {/* Texture Overlay */}
                        <div className="absolute inset-0 w-full h-full opacity-60" 
                             style={{ backgroundImage: 'radial-gradient(#be185d 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                        
                        {/* Top Surface */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-pink-300 opacity-50 blur-[1px]" 
                             style={{ animation: 'surface-wobble 3s infinite ease-in-out' }}></div>

                        {/* Rising Bubbles */}
                        <div className="absolute bottom-10 left-4 w-1 h-1 bg-rose-700 rounded-full" style={{ animation: 'speck-rise 4s infinite' }}></div>
                        <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-rose-800 rounded-full" style={{ animation: 'speck-rise 3s infinite 0.5s' }}></div>
                        <div className="absolute bottom-5 left-16 w-1 h-1 bg-rose-600 rounded-full" style={{ animation: 'speck-rise 5s infinite 1s' }}></div>
                   </div>
                </div>
              </foreignObject>
            </g>

            {/* C. Glass Reflections & Highlights */}
            <path d="M 15 90 Q 15 120 15 180" fill="none" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <path d="M 85 90 Q 85 120 85 180" fill="none" stroke="white" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
            <path d="M 32 10 L 32 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            
            {/* D. Bottle Outline/Rim */}
            <use href="#bottle-shape" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
            
            {/* E. The Thick Rim at Top */}
            <rect x="25" y="2" width="50" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            <rect x="25" y="2" width="50" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
           <h2 className="text-xl md:text-2xl font-bold text-pink-900 tracking-[0.2em] uppercase animate-pulse">
            Brewing Freshness...
           </h2>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENTS ---

const WaveSeparator = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
    </svg>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xl animate-liquid-pulse shadow-lg group-hover:rotate-12 transition-transform">P</div>
            <span className={`font-serif text-2xl font-bold tracking-wide transition-colors ${scrolled ? 'text-pink-600' : 'text-pink-800'}`}>Pink Sip</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'Ingredients', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-700 hover:text-pink-600 font-medium transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="shimmer-btn text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-pink-300/50 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center">Order Now</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pink-800">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
      </div>
      <div className={`md:hidden absolute w-full glass-panel transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {['Home', 'Products', 'Ingredients', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-pink-900 font-medium hover:bg-pink-100 rounded-lg">{item}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-center w-full mt-4 bg-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg cursor-pointer">Order Now</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setMousePos({ x: (window.innerWidth - e.pageX) / 40, y: (window.innerHeight - e.pageY) / 40 });
  };
  return (
    <section id="home" onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100/50 to-pink-200/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s', transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}></div>
        {/* Floating petals in background of HERO section too */}
        <FloatingPetal delay={0} duration={15} size={24} top={20} />
        <FloatingPetal delay={5} duration={18} size={32} top={60} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left space-y-8" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-pink-200 text-pink-600 font-semibold text-xs uppercase tracking-wider backdrop-blur-sm shadow-sm hover:scale-105 transition-transform cursor-default">
              <Star size={12} fill="currentColor" /> Premium Rose Milk
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1]">
              Sip the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Pink Magic</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">Authentic paneer rose essence blended with farm-fresh milk. No preservatives, just pure chilled nostalgia.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-300/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                <ShoppingBag size={20} /> Order Now
              </a>
              <a href="#products" className="group bg-white/50 hover:bg-white text-pink-700 px-8 py-4 rounded-full font-bold text-lg border border-pink-100 transition-all flex items-center justify-center gap-2 hover:shadow-lg cursor-pointer">
                View Flavors <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="absolute w-[450px] h-[450px] border border-pink-200/50 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="relative z-20" style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <img src="https://img.freepik.com/free-photo/front-view-pink-smoothie-bottle-with-straw_23-2148526544.jpg?t=st=1764726799~exp=1764730399~hmac=4760ab1f1aaf3af0dbcd333ceeaca4cafaa7651c7604da1b762fb301b4035419&w=1480" 
                    alt="Pink Sip Rose Milk Bottle" 
                    className="animate-bottle-enter relative w-64 md:w-80 h-auto object-cover rounded-3xl shadow-2xl transform transition-all duration-1000 ease-out hover:scale-105"
                    style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                  />
                  <div className="absolute top-12 -right-4 glass-card p-3 rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                        <div className="bg-pink-100 p-2 rounded-full text-pink-500"><Droplet size={20} fill="currentColor" /></div>
                        <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Purity</p><p className="text-sm font-bold text-pink-900">100% Real</p></div>
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

const Features = () => {
  const features = [
    { icon: <Droplet className="w-6 h-6 text-pink-500" />, title: "Freshly Made", desc: "Daily brewed with farm-fresh milk." },
    { icon: <Snowflake className="w-6 h-6 text-cyan-500" />, title: "Served Chilled", desc: "Maintained at 4°C for that refreshing kick." },
    { icon: <Heart className="w-6 h-6 text-rose-500" />, title: "No Preservatives", desc: "Pure ingredients, zero chemicals." }
  ];
  return (
    <section className="py-16 bg-white border-b border-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="reveal-hidden flex items-start gap-4 p-6 rounded-2xl hover:bg-pink-50/50 transition-colors" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">{feature.icon}</div>
              <div><h3 className="text-lg font-bold text-gray-900">{feature.title}</h3><p className="text-gray-600 text-sm mt-1">{feature.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const products = [
    { name: "Mini Sip", size: "200ml", price: "₹60", color: "bg-pink-50" },
    { name: "The Classic", size: "500ml", price: "₹80", color: "bg-rose-50", tag: "Best Seller" },
    { name: "Family Pack", size: "1L", price: "₹100", color: "bg-pink-100" }
  ];
  return (
    <section id="products" className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-hidden">
           <span className="text-pink-500 font-bold text-sm tracking-widest uppercase">Our Menu</span>
           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">Choose Your Sip</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, idx) => (
            <div key={idx} className="reveal-hidden glass-card rounded-[2rem] p-6 relative group overflow-hidden bg-white hover:bg-white/80" style={{ transitionDelay: `${idx * 150}ms` }}>
              {item.tag && <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wide">{item.tag}</div>}
              <div className={`h-56 ${item.color} rounded-3xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <img src="https://img.freepik.com/free-photo/high-angle-healthy-pink-smoothie_23-2148226032.jpg?t=st=1764726491~exp=1764730091~hmac=f8c3c90b3eca9c9ff5e2313e8b9619d7de2740b4717476dd2daedd3b2058cef9&w=1480" 
                       alt={item.name} 
                       className="h-40 object-cover rounded-xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 group-hover:-translate-y-2 transition-all duration-500 ease-out" />
              </div>
              <div className="flex justify-between items-end">
                <div><h3 className="text-xl font-bold text-gray-800">{item.name}</h3><p className="text-gray-500 text-sm mt-1">{item.size}</p></div>
                <div className="flex items-center gap-3"><span className="text-xl font-bold text-pink-600">{item.price}</span><button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all shadow-lg active:scale-95"><ShoppingBag size={16} /></button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IngredientItem = ({ title, desc, emoji, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-center gap-8 mb-24 md:mb-32 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'}`}
        >
            <div className="w-full md:w-1/2 relative z-10">
                <div className="glass-card bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-6xl mb-4">{emoji}</div>
                    <h3 className="text-3xl font-serif font-bold text-rose-950 mb-2">{title}</h3>
                    <p className="text-rose-900/70 leading-relaxed">{desc}</p>
                </div>
            </div>
            <div className="hidden md:block w-1/2"></div> 
        </motion.div>
    );
};

const Ingredients = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    const ingredients = [
        { title: "Paneer Rose", desc: "Hand-picked at dawn for peak fragrance. We use only the petals, ensuring a smooth, non-bitter essence.", emoji: "🌹" },
        { title: "Farm Fresh Milk", desc: "Sourced daily from local, grass-fed cows. Pasteurized gently to keep the natural creaminess intact.", emoji: "🥛" },
        { title: "Organic Cane Sugar", desc: "Just a hint of unrefined sweetness. No bleached white sugar, only the caramel-like richness of nature.", emoji: "🍬" }
    ];

    return (
        <section id="ingredients" ref={containerRef} className="py-32 bg-rose-50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative">
                <div className="text-center mb-32 relative z-20">
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-rose-500 font-bold tracking-widest uppercase text-sm">
                        The Composition
                    </motion.span>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-6xl font-bold text-rose-950 mt-4"
                    >
                        Pure Ingredients. <br /> Nothing Else.
                    </motion.h2>
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                    <motion.div style={{ y, scale, rotate }} className="relative top-24 md:top-0">
                        <div className="absolute inset-0 bg-rose-500/20 blur-[80px] rounded-full"></div>
                        <img src="https://img.freepik.com/free-photo/front-view-pink-smoothie-bottle-with-straw_23-2148526544.jpg?t=st=1764726799~exp=1764730399~hmac=4760ab1f1aaf3af0dbcd333ceeaca4cafaa7651c7604da1b762fb301b4035419&w=1480"
                            alt="Central Bottle" className="h-[400px] md:h-[600px] object-cover rounded-full opacity-90"
                            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                        />
                    </motion.div>
                </div>

                <div className="relative z-10">
                    {ingredients.map((item, idx) => (
                        <IngredientItem key={idx} {...item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-pink-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-full h-full bg-white -skew-y-12 transform origin-top-left z-0"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 reveal-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-500 mt-2">Questions? Bulk orders? We're here.</p>
        </div>
        <div className="reveal-hidden">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/40 p-8 rounded-3xl border border-white/50 shadow-xl backdrop-blur-sm h-full">
               <h3 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h3>
               <form className="space-y-5">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Your Name</label>
                   <input type="text" className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Phone Number</label>
                   <input type="tel" className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none" placeholder="+91 7867036289" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Message</label>
                   <textarea rows="4" className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none resize-none" placeholder="Tell us something..."></textarea>
                 </div>
                 <button className="w-full bg-gray-900 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-sm group">
                   Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
               </form>
            </div>
            <div className="glass-card bg-white rounded-3xl overflow-hidden border border-white/50 h-full min-h-[400px] shadow-xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.539353245453!2d77.7952673!3d9.4587042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf72d8c36c4b%3A0x6295555462712952!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"></iframe>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-pink-100">
                <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-pink-500" />
                   <span className="text-xs font-bold text-gray-800">Sivakasi, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const whatsappUrl = "https://wa.me/917867036289?text=Hi%20Pink%20Sip,%20I%20would%20like%20to%20know%20more%20about%20your%20products!";
  return (
    <footer className="bg-gradient-to-r from-rose-950 to-pink-900 text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
             <h3 className="text-2xl font-bold font-serif tracking-wide text-white">Pink Sip</h3>
             <p className="text-pink-200/80 text-sm leading-relaxed">"Sip the love, taste the tradition. Pure rose milk blended with happiness and discovery."</p>
             <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={28} /></a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaWhatsapp size={28} /></a>
             </div>
             <p className="text-xs text-pink-300">IG: pinksip_official</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Contact Us</h4>
            <div className="space-y-4">
               <div className="flex items-start gap-3"><Phone size={20} className="text-pink-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Call</span><a href="tel:+917867036289" className="text-sm text-pink-100/80 hover:text-white transition-colors">+91 7867036289</a></div></div>
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group"><FaWhatsapp size={20} className="text-green-400 mt-1 shrink-0 group-hover:scale-110 transition-transform" /><div><span className="block font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</span><span className="text-sm text-pink-100/80 group-hover:text-white transition-colors">+91 7867036289</span></div></a>
               <div className="flex items-start gap-3"><Mail size={20} className="text-blue-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Email</span><span className="text-sm text-pink-100/80">hello@pinksip.com</span></div></div>
               <div className="flex items-start gap-3"><MapPin size={20} className="text-yellow-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Visit</span><span className="text-sm text-pink-100/80">Sivakasi</span></div></div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Our Promise</h4>
            <ul className="space-y-4">
               <li className="flex items-start gap-3 text-sm text-pink-100/80"><Star size={18} className="text-yellow-400 shrink-0" /><span>100% Natural Ingredient</span></li>
               <li className="flex items-start gap-3 text-sm text-pink-100/80"><Heart size={18} className="text-red-400 shrink-0" /><span>Made with Pure Love & Care</span></li>
               <li className="flex items-start gap-3 text-sm text-pink-100/80"><CheckCircle2 size={18} className="text-green-400 shrink-0" /><span>Best Local Beverage Brand</span></li>
            </ul>
          </div>
          <div className="space-y-6">
             <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Quick Links</h4>
             <ul className="space-y-3 text-sm text-pink-100/80">
               <li><a href="#home" className="hover:text-white hover:translate-x-1 transition-all inline-block flex items-center gap-1">Home <ArrowUpRight size={12}/></a></li>
               <li><a href="#products" className="hover:text-white hover:translate-x-1 transition-all inline-block flex items-center gap-1">Our Menu <ArrowUpRight size={12}/></a></li>
               <li><a href="#ingredients" className="hover:text-white hover:translate-x-1 transition-all inline-block flex items-center gap-1">Ingredients <ArrowUpRight size={12}/></a></li>
               <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-all inline-block flex items-center gap-1">Order Online <ArrowUpRight size={12}/></a></li>
             </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center"><p className="text-pink-300/60 text-sm">© 2025 Pink Sip. All Rights Reserved.</p></div>
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  useScrollReveal();
  return (
    <div className="font-sans text-gray-900 selection:bg-pink-200 selection:text-pink-900">
      <style>{customStyles}</style>
      {loading && <BottlePreloader finishLoading={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Products />
          <Ingredients />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;