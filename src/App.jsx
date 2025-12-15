import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Droplet, Heart, Snowflake, Instagram, ArrowRight, 
  ShoppingBag, Send, MapPin, Phone, Mail, Star, CheckCircle2, 
  ArrowUpRight, Check 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- IMAGE IMPORTS ---
import productImg from './assets/pinksip_bottle.png'; 
import logoImg from './pinksiplogos1.png';
import roseMilkImg from './assets/rosemilk.jpg'; 

// --- CUSTOM STYLES & ANIMATIONS ---
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
      left: '-10%' 
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
      <div className="absolute inset-0 pointer-events-none w-full h-full">
         <FloatingPetal delay={0} duration={6} size={30} top={20} />
         <FloatingPetal delay={2} duration={8} size={20} top={80} />
         <FloatingPetal delay={1} duration={7} size={25} top={50} />
         <FloatingPetal delay={3.5} duration={9} size={15} top={10} />
         <FloatingPetal delay={0.5} duration={5} size={35} top={65} />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-8">
        <div className="relative w-[140px] h-[300px]">
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
              <pattern id="specks" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#be185d" opacity="0.3" />
              </pattern>
              <clipPath id="bottle-clip">
                <use href="#bottle-shape" />
              </clipPath>
            </defs>

            <use href="#bottle-shape" fill="rgba(255,255,255,0.2)" />

            <g clipPath="url(#bottle-clip)">
              <foreignObject x="0" y="0" width="100" height="200">
                <div className="w-full h-full flex flex-col justify-end">
                    <div className="w-full bg-pink-400 relative"
                         style={{ animation: 'rise-liquid 2.5s ease-out forwards 0.5s', height: '0%' }}>
                        <div className="absolute inset-0 w-full h-full opacity-60" 
                             style={{ backgroundImage: 'radial-gradient(#be185d 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                        <div className="absolute top-0 left-0 w-full h-2 bg-pink-300 opacity-50 blur-[1px]" 
                             style={{ animation: 'surface-wobble 3s infinite ease-in-out' }}></div>
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

// --- FLOATING WHATSAPP BUTTON ---
const FloatingWhatsAppButton = () => {
  // Encoded message: "Hi Pink Sip, I would like to place an order"
  const message = "Hi Pink Sip, I would like to place an order";
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "918807869898";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] group flex items-center justify-center"
    >
      {/* Tooltip Text */}
      <span className="absolute right-full mr-3 bg-white text-pink-900 text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-pink-100">
        Order via WhatsApp
      </span>
      
      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300">
        <FaWhatsapp className="text-white w-8 h-8" />
      </div>
      
      {/* Ping Animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
    </a>
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

// --- NAVBAR ---
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
        <div className="flex justify-between items-center relative h-16">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer z-30">
             <img 
               src={logoImg} 
               alt="Pink Sip" 
               className="h-12 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
             />
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <h1 className="text-[10px] xs:text-xs sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-pink-900 tracking-[0.15em] uppercase pointer-events-auto whitespace-nowrap">
              The Brew Beverages
            </h1>
          </div>

          <div className="hidden 2xl:flex items-center space-x-8 z-30">
            {['Home', 'Products', 'Ingredients', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-700 hover:text-pink-600 font-medium transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="shimmer-btn text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-pink-300/50 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center">Order Now</a>
          </div>

          <div className="2xl:hidden flex items-center z-30">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pink-800 bg-white/50 p-2 rounded-full backdrop-blur-sm hover:bg-white/80 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      <div className={`2xl:hidden absolute w-full glass-panel transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md shadow-lg border-t border-pink-100">
          
          {['Home', 'Products', 'Ingredients', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-pink-900 font-medium hover:bg-pink-50 rounded-lg transition-colors">{item}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-center w-full mt-4 bg-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg cursor-pointer hover:bg-pink-600 transition-colors">Order Now</a>
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
              The Brew <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Something new in every sip</span>
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
                  <img src={roseMilkImg} 
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
                 <img src={productImg} 
                        alt={item.name} 
                        className="h-48 w-auto object-contain drop-shadow-xl transform group-hover:scale-110 group-hover:-rotate-6 group-hover:-translate-y-2 transition-all duration-500 ease-out" />
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
                        <img src={roseMilkImg}
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
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxi-JgFNvBo67PXK19_X3rej_MhJZWdIRJ_cltlp--ODfIq_7RLN9Ab9p53vOpPdUgx/exec"; 

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('message', formData.message);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: data 
      });
      
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus('error');
    }
  };

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
            <div className="bg-white/40 p-8 rounded-3xl border border-white/50 shadow-xl backdrop-blur-sm h-full flex flex-col justify-center">
               
               {status === 'success' ? (
                 <div className="text-center py-12 animate-float">
                   <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                     <Check size={40} className="text-green-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                   <p className="text-gray-600 mb-6">We have received your message and will get back to you shortly.</p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="text-pink-600 font-bold hover:text-pink-800 underline"
                   >
                     Send another message
                   </button>
                 </div>
               ) : (
                 <>
                   <h3 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h3>
                   <form className="space-y-5" onSubmit={handleSubmit}>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Your Name</label>
                       <input 
                         required
                         type="text" 
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none" 
                         placeholder="Name" 
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Phone Number</label>
                       <input 
                         required
                         type="tel" 
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none" 
                         placeholder="+91 8807869898" 
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Message</label>
                       <textarea 
                         required
                         rows="4" 
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full glass-input px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none resize-none" 
                         placeholder="Tell us something..."
                       ></textarea>
                     </div>
                     <button 
                       type="submit" 
                       disabled={status === 'submitting'}
                       className={`w-full bg-gray-900 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-sm group ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
                     >
                       {status === 'submitting' ? 'Sending...' : 'Send Message'}
                       
                       {status !== 'submitting' && (
                         <Send 
                           size={18} 
                           strokeWidth={2.5} 
                           className="mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                         />
                       )}
                     </button>
                     {status === 'error' && <p className="text-red-500 text-center text-xs mt-2">Something went wrong. Please try again.</p>}
                   </form>
                 </>
               )}

            </div>
            <div className="glass-card bg-white rounded-3xl overflow-hidden border border-white/50 h-full min-h-[400px] shadow-xl relative">
              <iframe 
                src="https://maps.google.com/maps?q=2%2F337%2FD6%2C+State+Bank+Colony%2C+Sivakasi+-+626+129&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="absolute inset-0">
              </iframe>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-pink-100">
                <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-pink-500" />
                   <span className="text-xs font-bold text-gray-800">2/337/D6, State Bank Colony, Sivakasi - 626 129</span>
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
  const whatsappUrl = "https://wa.me/918807869898?text=Hi%20Pink%20Sip,%20I%20would%20like%20to%20know%20more%20about%20your%20products!";
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
               <div className="flex items-start gap-3"><Phone size={20} className="text-pink-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Call</span><a href="tel:+918807869898" className="text-sm text-pink-100/80 hover:text-white transition-colors">+91 8807869898</a></div></div>
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group"><FaWhatsapp size={20} className="text-green-400 mt-1 shrink-0 group-hover:scale-110 transition-transform" /><div><span className="block font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</span><span className="text-sm text-pink-100/80 group-hover:text-white transition-colors">+91 8807869898</span></div></a>
               <div className="flex items-start gap-3"><Mail size={20} className="text-blue-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Email</span><span className="text-sm text-pink-100/80">care@thebrewbeverages.com</span></div></div>
               <div className="flex items-start gap-3"><MapPin size={20} className="text-yellow-400 mt-1 shrink-0" /><div><span className="block font-bold text-white">Visit</span><span className="text-sm text-pink-100/80">Sivakasi, Tamilnadu, India</span></div></div>
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
        {/* Floating Button */}
        <FloatingWhatsAppButton /> 
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