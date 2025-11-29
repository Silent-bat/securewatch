'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="relative py-32 md:py-40 bg-transparent overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm text-white/80">
                            Join 500+ Verified Collectors
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                        Start Collecting with
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            Complete Confidence
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Every watch verified by experts. Every transaction secured by blockchain.
                        Every collector protected by transparency.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Button
                            size="lg"
                            className="h-16 px-12 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/20"
                            asChild
                        >
                            <Link href="/marketplace">
                                Explore Collection <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-16 px-12 text-lg rounded-full border-2 border-white/30 hover:bg-white/10 text-white"
                            asChild
                        >
                            <Link href="/auth/register">Create Free Account</Link>
                        </Button>
                    </div>

                    <p className="text-sm text-white/50 pt-4">
                        No credit card required • Free to browse • Instant verification
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
