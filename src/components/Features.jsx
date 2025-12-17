import React from 'react';
import { Droplet, Snowflake, Heart } from 'lucide-react';

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

export default Features;
