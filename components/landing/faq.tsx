'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How does the authentication process work?',
        answer:
            'Our certified horologists conduct a thorough physical inspection of your watch, examining movement, case, dial, and all components. We verify serial numbers, check for authenticity markers, and document any modifications. Once verified, the watch is photographed and its details are permanently recorded on the blockchain.',
    },
    {
        question: 'What blockchain do you use?',
        answer:
            'We use Polygon (formerly Matic Network) for blockchain verification. Polygon offers fast transactions, low fees, and is fully compatible with Ethereum, making it ideal for luxury asset tokenization while maintaining security and decentralization.',
    },
    {
        question: 'How are physical watches stored?',
        answer:
            'We do not store physical watches. SecureWatch is a verification and marketplace platform. After authentication, watches remain with their owners or are shipped directly between buyer and seller through our secure escrow system with insured shipping.',
    },
    {
        question: 'What are the platform fees?',
        answer:
            'Fees vary by plan: Collector (Free) has a 5% transaction fee, Dealer ($49/mo) has 3%, and Enterprise has custom rates starting at 1%. Verification fees are separate and depend on watch value, typically 0.5-1% of declared value.',
    },
    {
        question: 'How long does verification take?',
        answer:
            'Standard verification takes 5-7 business days. Dealer plan members receive priority verification within 48 hours. Rush verification (24 hours) is available for an additional fee. Timeline may vary during peak seasons.',
    },
    {
        question: 'How does fractional ownership work?',
        answer:
            'Fractional ownership allows multiple investors to own shares of ultra-luxury watches. Each share is represented as a blockchain token, giving you proportional ownership rights. Shares can be traded on our platform, and physical possession can rotate among owners or remain in secure vault storage.',
    },
    {
        question: 'What happens if I lose my physical watch?',
        answer:
            'Your blockchain ownership record represents authenticity and provenance, not physical possession. If your watch is lost or stolen, file a police report and notify us immediately. The blockchain record helps with insurance claims and proves ownership history, but we cannot track physical location.',
    },
    {
        question: 'How do I contact support?',
        answer:
            'Our support team is available Monday-Friday, 9 AM - 6 PM EST. Contact us via email at support@securewatch.io, through live chat on our website, or call +1 (555) 123-4567. Enterprise customers have dedicated account managers available 24/7.',
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-white/10"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors pr-8">
                    {question}
                </span>
                <ChevronDown
                    className={`w-6 h-6 text-white/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-white/70 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    return (
        <section className="py-20 md:py-32 bg-black/20">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-white/70">
                        Everything you need to know about SecureWatch
                    </p>
                </motion.div>

                <div className="space-y-0">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/60">
                        Still have questions?{' '}
                        <a
                            href="/contact"
                            className="text-white underline hover:text-white/80 transition-colors"
                        >
                            Contact our team
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
