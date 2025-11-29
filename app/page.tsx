'use client';

import { Navbar } from '@/components/landing/navbar';
import { ScrollWebGLBackground } from '@/components/landing/scroll-webgl-background';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Stats } from '@/components/landing/stats';
import { Benefits } from '@/components/landing/benefits';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Gem, Lock } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative bg-black text-white min-h-screen">
      {/* WebGL Background - covers entire page */}
      <ScrollWebGLBackground>
        <></>
      </ScrollWebGLBackground>

      {/* All content with proper z-index to be in front */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Timeless Luxury
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
              The world's first blockchain-verified marketplace for authenticated luxury watches.
            </p>
            <div className="pt-8">
              <p className="text-sm text-white/50 uppercase tracking-widest mb-4">Scroll to Explore</p>
              <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
            </div>
          </motion.div>
        </section>

        {/* All SaaS Sections with IDs for navigation */}
        <div id="features">
          <FeaturesGrid />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <Stats />
        <Benefits />
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
