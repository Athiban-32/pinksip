import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../pinksiplogos1.png';

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
        <div className="flex justify-between items-center h-16 relative">
          
          {/* LEFT SIDE: Logo + Desktop Title */}
          {/* We group these so the title sits next to the logo on large screens */}
          <div className="flex items-center gap-4 z-30">
            <div className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
               <img 
                 src={logoImg} 
                 alt="Pink Sip" 
                 className="h-12 md:h-16 w-auto object-contain" 
               />
            </div>
            
            {/* DESKTOP TITLE: Visible only on 2xl screens, sits next to logo */}
            <h1 className="hidden 2xl:block text-2xl font-serif font-bold text-pink-900 tracking-[0.15em] uppercase whitespace-nowrap">
              The Brew Beverages
            </h1>
          </div>

          {/* CENTER TITLE: Mobile/Tablet Only */}
          {/* We hide this on 2xl so it doesn't overlap the Navigation Links */}
          <div className="2xl:hidden absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <h1 className="text-[10px] xs:text-xs sm:text-lg md:text-xl font-serif font-bold text-pink-900 tracking-[0.15em] uppercase whitespace-nowrap">
              The Brew Beverages
            </h1>
          </div>

          {/* RIGHT SIDE: Navigation Links */}
          <div className="hidden 2xl:flex items-center space-x-8 z-30">
            {['Home', 'Products', 'Ingredients', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-700 hover:text-pink-600 font-medium transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="shimmer-btn text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-pink-300/50 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center">Order Now</a>
          </div>

          {/* MOBILE BURGER MENU */}
          <div className="2xl:hidden flex items-center z-30">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pink-800 bg-white/50 p-2 rounded-full backdrop-blur-sm hover:bg-white/80 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
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

export default Navbar;