'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Store, Sparkles, FileText, Globe } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Blockchain Verification',
        description: 'Every watch is permanently recorded on the blockchain for immutable proof of authenticity and ownership history.',
    },
    {
        icon: Fingerprint,
        title: 'Expert Authentication',
        description: 'Decentralized network of certified watchmakers and experts stake their reputation to verify authenticity.',
    },
    {
        icon: Store,
        title: 'Instant Liquidity',
        description: 'Get real-time market value and sell verified watches within minutes through automatic escrow.',
    },
    {
        icon: Sparkles,
        title: 'Fractional Ownership',
        description: 'Own shares of ultra-luxury timepieces. Democratizing access to six-figure watches through tradeable tokens.',
    },
    {
        icon: FileText,
        title: 'Heritage & Stories',
        description: 'Add verified personal stories and experiences to your watch. Provable provenance increases value.',
    },
    {
        icon: Globe,
        title: 'Dynamic Insurance',
        description: 'Smart contracts automatically adjust coverage based on location and usage, optimizing your protection.',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function FeaturesGrid() {
    return (
        <section className="py-20 md:py-32 bg-black/20">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why Choose SecureWatch
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        The most trusted platform for luxury watch authentication and trading
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
                        >
                            <feature.icon className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
