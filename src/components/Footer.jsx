import React from 'react';
import { Instagram, Phone, Mail, MapPin, Star, Heart, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/918807869898?text=Hi%20Pink%20Sip,%20I%20would%20like%20to%20know%20more%20about%20your%20products!";

  return (
    <footer className="bg-gradient-to-r from-rose-950 to-pink-900 text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="space-y-6">
             <h3 className="text-2xl font-bold font-serif tracking-wide text-white">Pink Sip</h3>
             <p className="text-pink-200/80 text-sm leading-relaxed">"Sip the love, taste the tradition. Pure rose milk blended with happiness and discovery."</p>
             <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={28} /></a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaWhatsapp size={28} /></a>
             </div>
             <p className="text-xs text-pink-300">IG: pinksip_official</p>
          </div>

          {/* CONTACT COLUMN */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Contact Us</h4>
            <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <Phone size={20} className="text-pink-400 mt-1 shrink-0" />
                 <div>
                   <span className="block font-bold text-white">Call</span>
                   <a href="tel:+918807869898" className="text-sm text-pink-100/80 hover:text-white transition-colors">+91 8807869898</a>
                 </div>
               </div>
               
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                 <FaWhatsapp size={20} className="text-green-400 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                 <div>
                   <span className="block font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</span>
                   <span className="text-sm text-pink-100/80 group-hover:text-white transition-colors">+91 8807869898</span>
                 </div>
               </a>

               <div className="flex items-start gap-3">
                 <Mail size={20} className="text-blue-400 mt-1 shrink-0" />
                 <div>
                   <span className="block font-bold text-white">Email</span>
                   <span className="text-sm text-pink-100/80">care@thebrewbeverages.com</span>
                 </div>
               </div>

               <div className="flex items-start gap-3">
                 <MapPin size={20} className="text-yellow-400 mt-1 shrink-0" />
                 <div>
                   <span className="block font-bold text-white">Visit</span>
                   <span className="text-sm text-pink-100/80">Sivakasi, Tamilnadu, India</span>
                 </div>
               </div>
            </div>
          </div>

          {/* PROMISE COLUMN */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Our Promise</h4>
            <ul className="space-y-4">
               <li className="flex items-start gap-3 text-sm text-pink-100/80">
                 <Star size={18} className="text-yellow-400 shrink-0" /><span>100% Natural Ingredient</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-pink-100/80">
                 <Heart size={18} className="text-red-400 shrink-0" /><span>Made with Pure Love & Care</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-pink-100/80">
                 <CheckCircle2 size={18} className="text-green-400 shrink-0" /><span>Best Local Beverage Brand</span>
               </li>
            </ul>
          </div>

          {/* LINKS COLUMN */}
          <div className="space-y-6">
             <h4 className="text-sm font-bold uppercase tracking-widest text-pink-300">Quick Links</h4>
             <ul className="space-y-3 text-sm text-pink-100/80">
               <li><a href="#home" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">Home <ArrowUpRight size={12}/></a></li>
               <li><a href="#products" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">Our Menu <ArrowUpRight size={12}/></a></li>
               <li><a href="#ingredients" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">Ingredients <ArrowUpRight size={12}/></a></li>
               <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1">Order Online <ArrowUpRight size={12}/></a></li>
             </ul>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-pink-300/60 text-sm">
            © {currentYear} Pink Sip. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;