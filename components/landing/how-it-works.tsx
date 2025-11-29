'use client';

import { motion } from 'framer-motion';
import { Upload, SearchCheck, Sparkles, TrendingUp } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Upload,
        title: 'Submit Your Watch',
        description: 'Upload detailed photos and information about your luxury timepiece through our secure platform.',
    },
    {
        number: '02',
        icon: SearchCheck,
        title: 'Expert Verification',
        description: 'Our certified horologists conduct thorough physical inspection and authentication.',
    },
    {
        number: '03',
        icon: Sparkles,
        title: 'Blockchain Registration',
        description: 'Your watch is permanently recorded on the blockchain, creating an immutable certificate of authenticity.',
    },
    {
        number: '04',
        icon: TrendingUp,
        title: 'List & Trade',
        description: 'List your authenticated watch on our marketplace and trade with confidence.',
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 md:py-32 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        From submission to sale, we make luxury watch authentication seamless
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20 -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Step Number Circle */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg z-10 relative">
                                            {step.number}
                                        </div>
                                    </div>
                                </div>

                                {/* Card */}
                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-center">
                                    <step.icon className="w-10 h-10 text-white mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
