import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
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
      <span className="absolute right-full mr-3 bg-white text-pink-900 text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-pink-100">
        Order via WhatsApp
      </span>
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300">
        <FaWhatsapp className="text-white w-8 h-8" />
      </div>
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
    </a>
  );
};

export default FloatingWhatsAppButton;
