'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'James Chen',
        role: 'Watch Collector',
        company: 'Hong Kong',
        image: '/testimonial-1.jpg', // Placeholder - would use real images
        quote: 'SecureWatch has revolutionized how I buy and sell luxury timepieces. The blockchain verification gives me complete confidence in every transaction.',
        rating: 5,
    },
    {
        name: 'Sophie Laurent',
        role: 'Luxury Dealer',
        company: 'Geneva, Switzerland',
        image: '/testimonial-2.jpg',
        quote: 'As a professional dealer, the authentication process is crucial. SecureWatch\'s expert verification and blockchain certification have become essential to my business.',
        rating: 5,
    },
    {
        name: 'Marcus Rodriguez',
        role: 'Investment Manager',
        company: 'New York, USA',
        image: '/testimonial-3.jpg',
        quote: 'The transparency and security of blockchain-backed ownership has made luxury watches a viable asset class for our portfolio. Highly recommend.',
        rating: 5,
    },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
        >
            <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white text-white" />
                ))}
            </div>

            <Quote className="w-10 h-10 text-white/20 mb-4" />

            <p className="text-white/80 text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
            </p>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                </div>
                <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">
                        {testimonial.role} • {testimonial.company}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Testimonials() {
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
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Hear from luxury watch enthusiasts who trust SecureWatch
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-16 border-t border-white/10"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        <div className="text-center">
                            <div className="text-white/40 text-sm mb-2">Certified By</div>
                            <div className="text-white font-semibold">Swiss Horological Society</div>
                        </div>
                        <div className="text-center">
                            <div className="text-white/40 text-sm mb-2">Secured By</div>
                            <div className="text-white font-semibold">Polygon Blockchain</div>
                        </div>
                        <div className="text-center">
                            <div className="text-white/40 text-sm mb-2">Insured By</div>
                            <div className="text-white font-semibold">Lloyd's of London</div>
                        </div>
                        <div className="text-center">
                            <div className="text-white/40 text-sm mb-2">Trusted By</div>
                            <div className="text-white font-semibold">500+ Collectors</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
