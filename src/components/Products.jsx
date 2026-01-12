import React from 'react';
import productImg from '../assets/pinksip_bottle.png';
import { ShoppingBag } from 'lucide-react';

const Products = () => {
  const WHATSAPP_NUMBER = "918807869898"; 

  const products = [
    { name: 'Rose milk ice cream', size: '200ml', price: '35/-' },
    { name: 'Rose Falooda', size: '500ml', price: '65/-' },
    { name: 'Rose milk cake', size: '1L', price: '115/-' },
  ];

  const handleOrder = (productName) => {
    // Construct the message
    const message = `Hello, I want to know more about the ${productName}`;
    
    // Create the WhatsApp URL
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    window.open(url, '_blank');
  };

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
              
              {/* Tag (Best Seller) */}
              {item.tag && <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wide">{item.tag}</div>}
              
              {/* Image Container */}
              <div className={`h-56 ${item.color} rounded-3xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <img src={productImg} 
                      alt={item.name} 
                      className="h-48 w-auto object-contain drop-shadow-xl transform group-hover:scale-110 group-hover:-rotate-6 group-hover:-translate-y-2 transition-all duration-500 ease-out" />
              </div>
              
              {/* Product Details & Button */}
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.size}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-pink-600">{item.price}</span>
                  
                  {/* Updated Button with onClick Handler */}
                  <button 
                    onClick={() => handleOrder(item.name)}
                    className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all shadow-lg active:scale-95 cursor-pointer"
                    aria-label={`Order ${item.name}`}
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;