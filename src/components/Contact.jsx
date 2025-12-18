import React, { useState } from 'react';
import { Check, Send, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxi-JgFNvBo67PXK19_X3rej_MhJZWdIRJ_cltlp--ODfIq_7RLN9Ab9p53vOpPdUgx/exec"; 

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

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
    <section id="contact" className="py-20 md:py-32 relative bg-[#FFF9FA] overflow-hidden">
      
      {/* PROFESSIONAL BACKGROUND ACCENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-pink-600 font-bold tracking-widest text-xs uppercase bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Get in Touch
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg font-light">
            Have a question or looking for bulk orders? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: FORM SECTION (Span 7) */}
            <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>

               {status === 'success' ? (
                 <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                   <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100 animate-[bounce_1s_ease-in-out]">
                     <Check size={40} className="text-green-600" />
                   </div>
                   <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Message Sent!</h3>
                   <p className="text-gray-500 mb-8 max-w-xs mx-auto">Thank you for reaching out. We will get back to you shortly.</p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                   >
                     Send Another
                   </button>
                 </div>
               ) : (
                 <>
                   <div className="mb-8">
                     <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                     <p className="text-gray-400 text-sm mt-1">Fill out the form below and we'll reply soon.</p>
                   </div>

                   <form className="space-y-6" onSubmit={handleSubmit}>
                     <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                         <input 
                           required
                           type="text" 
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="w-full bg-white border border-gray-100 px-5 py-4 rounded-2xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm" 
                           placeholder="John Doe" 
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Phone Number</label>
                         <input 
                           required
                           type="tel" 
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           className="w-full bg-white border border-gray-100 px-5 py-4 rounded-2xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm" 
                           placeholder="+91 98765 43210" 
                         />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Your Message</label>
                       <textarea 
                         required
                         rows="4" 
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-white border border-gray-100 px-5 py-4 rounded-2xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm resize-none" 
                         placeholder="I'm interested in..."
                       ></textarea>
                     </div>

                     <button 
                       type="submit" 
                       disabled={status === 'submitting'}
                       className={`w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-base ${status === 'submitting' ? 'opacity-80 cursor-wait' : ''}`}
                     >
                       {status === 'submitting' ? (
                         <span>Sending...</span>
                       ) : (
                         <>
                           <span>Send Message</span>
                           <div className="bg-white/20 p-1 rounded-full">
                             <Send size={16} strokeWidth={2.5} />
                           </div>
                         </>
                       )}
                     </button>
                     {status === 'error' && <p className="text-red-500 text-center text-sm font-medium mt-2 bg-red-50 py-2 rounded-lg">Something went wrong. Please try again.</p>}
                   </form>
                 </>
               )}
            </div>
            
            {/* RIGHT: MAP & INFO SECTION (Span 5) */}
            <div className="lg:col-span-5 space-y-6 h-full flex flex-col">
              
              {/* Info Cards (Clickable) */}
              <div className="grid grid-cols-2 gap-4">
                 
                 {/* CALL CARD */}
                 <a 
                   href="tel:+918807869898" 
                   className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:border-pink-100 transition-all cursor-pointer group"
                 >
                    <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                      <Phone size={20}/>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Call Us</p>
                      <p className="text-sm font-bold text-gray-800">+91 8807869898</p>
                    </div>
                 </a>

                 {/* WHATSAPP CARD */}
                 <a 
                   href="https://wa.me/918807869898"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:border-green-100 transition-all cursor-pointer group"
                 >
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                      <FaWhatsapp size={20}/>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">WhatsApp</p>
                      <p className="text-sm font-bold text-gray-800">Chat Now</p>
                    </div>
                 </a>
              </div>

              {/* Map Container */}
              <div className="flex-1 bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-lg relative min-h-[350px]">
                <iframe 
                  src="https://maps.google.com/maps?q=2%2F337%2FD6%2C+State+Bank+Colony%2C+Sivakasi+-+626+129&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{border:0, opacity: 0.9}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  title="Google Map"
                >
                </iframe>
                
                {/* Custom Floating Location Pin */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50">
                  <div className="flex items-start gap-4">
                     <div className="bg-pink-100 p-3 rounded-full text-pink-600 shrink-0">
                       <MapPin size={24} fill="currentColor" className="opacity-20 text-pink-600" />
                       <MapPin size={24} className="absolute top-3 left-3" />
                     </div>
                     <div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Our Location</span>
                       <span className="text-sm font-bold text-gray-900 leading-snug block">
                         2/337/D6, State Bank Colony, <br/>Sivakasi - 626 129
                       </span>
                     </div>
                  </div>
                </div>
              </div>

            </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;