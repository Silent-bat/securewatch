'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Globe2 } from 'lucide-react';

const benefits = [
    {
        icon: Shield,
        title: 'Trust & Transparency',
        description: 'Built on blockchain technology for complete transparency',
        features: [
            'Immutable blockchain records',
            'Decentralized authentication network',
            'Complete provenance history',
            'Certified authenticity reports',
        ],
    },
    {
        icon: Lock,
        title: 'Investment & Liquidity',
        description: 'Turn your timepieces into liquid, fractional assets',
        features: [
            'Fractional ownership of ultra-luxury watches',
            'Instant liquidity marketplace',
            'Real-time market valuations',
            'Automated escrow & transfers',
        ],
    },
    {
        icon: Globe2,
        title: 'Smart Protection',
        description: 'AI-powered maintenance and dynamic insurance',
        features: [
            'Predictive maintenance alerts',
            'Location-based insurance coverage',
            'Heritage & storytelling layer',
            'Time-locked inheritance contracts',
        ],
    },
];

export function Benefits() {
    return (
        <section className="py-20 md:py-32 bg-black/20">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        The SecureWatch Advantage
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Why thousands of collectors trust us with their most valuable timepieces
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } gap-12 items-center`}
                        >
                            {/* Icon Side */}
                            <div className="flex-1 flex justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 flex items-center justify-center">
                                    <benefit.icon className="w-24 h-24 text-white" />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-xl text-white/70 mb-8">
                                    {benefit.description}
                                </p>
                                <ul className="space-y-4">
                                    {benefit.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-lg text-white/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
