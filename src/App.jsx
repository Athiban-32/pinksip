
import React, { useState } from 'react';
import { useScrollReveal } from './components/useScrollReveal';
import customStyles from './components/customStyles';
import Navbar from './components/Navbar';
import BottlePreloader from './components/BottlePreloader';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Ingredients from './components/Ingredients';
import Contact from './components/Contact';
import Footer from './components/Footer';

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