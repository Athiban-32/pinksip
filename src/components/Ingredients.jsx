import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import IngredientItem from './IngredientItem';
import roseMilkImg from '../assets/rosemilk.jpg';

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

export default Ingredients;
