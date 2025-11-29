'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatProps {
    value: string;
    label: string;
    suffix?: string;
}

function AnimatedStat({ value, label, suffix = '+' }: StatProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
            const controls = animate(count, numericValue, { duration: 2, ease: 'easeOut' });
            return controls.stop;
        }
    }, [isInView, count, value]);

    return (
        <div ref={ref} className="text-center">
            <motion.div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {value.includes('$') && '$'}
                <motion.span>{rounded}</motion.span>
                {value.includes('M') && 'M'}
                {value.includes('K') && 'K'}
                {suffix}
            </motion.div>
            <div className="text-lg text-white/60">{label}</div>
        </div>
    );
}

export function Stats() {
    return (
        <section className="py-20 md:py-32 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Trusted by Collectors Worldwide
                    </h2>
                    <p className="text-xl text-white/70">
                        Join a growing community of luxury watch enthusiasts
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <AnimatedStat value="25" label="Total Watch Value" suffix="M+" />
                    <AnimatedStat value="1200" label="Verified Watches" suffix="+" />
                    <AnimatedStat value="500" label="Trusted Collectors" suffix="+" />
                    <AnimatedStat value="50" label="Partner Brands" suffix="+" />
                </div>
            </div>
        </section>
    );
}
