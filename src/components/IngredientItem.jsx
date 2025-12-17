import React from 'react';
import { motion } from 'framer-motion';

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

export default IngredientItem;
