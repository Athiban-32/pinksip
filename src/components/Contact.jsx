import React, { useState } from 'react';
import { Check, Send, MapPin } from 'lucide-react';

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

export default Contact;
