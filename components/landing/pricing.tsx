'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const tiers = [
    {
        name: 'Collector',
        price: 'Coming Soon',
        description: 'Perfect for watch enthusiasts starting their collection',
        features: [
            'Browse unlimited watches',
            'Basic verification included',
            'Community access',
            'Buyer protection',
            '5% transaction fee',
        ],
        cta: 'Get Started',
        href: '/auth/register',
        highlighted: false,
    },
    {
        name: 'Dealer',
        price: 'Coming Soon',
        description: 'For professional dealers and serious collectors',
        features: [
            'List unlimited watches',
            'Priority verification (48hrs)',
            'Analytics dashboard',
            'API access',
            'Dedicated support',
            '3% transaction fee',
        ],
        cta: 'Start Free Trial',
        href: '/auth/register',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Coming Soon',
        description: 'Tailored solutions for auction houses and retailers',
        features: [
            'White-label solution',
            'Full API access',
            'Custom integrations',
            'Volume discounts',
            'Dedicated account manager',
            '1% transaction fee',
        ],
        cta: 'Contact Sales',
        href: '/contact',
        highlighted: false,
    },
];

export function Pricing() {
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
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. No hidden fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-2xl ${tier.highlighted
                                ? 'bg-white/10 border-2 border-white/30 shadow-2xl shadow-white/10'
                                : 'bg-white/5 border border-white/10'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-5xl font-bold text-white">
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span className="text-white/60">{tier.period}</span>
                                    )}
                                </div>
                                <p className="text-white/70">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-12 rounded-full text-base ${tier.highlighted
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    }`}
                                asChild
                            >
                                <Link href={tier.href}>{tier.cta}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center text-white/50 mt-12"
                >
                    All plans include blockchain verification and secure transactions
                </motion.p>
            </div>
        </section>
    );
}
