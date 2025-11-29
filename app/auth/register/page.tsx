'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setIsLoading(true);

        try {
            await register(formData.email, formData.password, formData.name || undefined);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const passwordStrength = formData.password.length >= 8;

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden">
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <h1 className="text-4xl font-bold mb-2">SecureWatch</h1>
                        </Link>
                        <p className="text-white/60">Start your luxury watch journey</p>
                    </div>

                    {/* Form Card */}
                    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200">{error}</p>
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white/90">
                                    Full Name <span className="text-white/40 text-sm">(Optional)</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-white/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/90">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-white/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white/90">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-white/20"
                                />
                                {formData.password && (
                                    <div className="flex items-center gap-2 text-sm">
                                        {passwordStrength ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400">Strong password</span>
                                            </>
                                        ) : (
                                            <span className="text-white/50">Minimum 8 characters required</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-white/90">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-white/20"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 text-base rounded-full bg-gradient-to-r from-zinc-100 via-white to-zinc-100 text-black hover:from-white hover:via-zinc-50 hover:to-white font-semibold shadow-lg transition-all duration-300 mt-6"
                            >
                                {isLoading ? (
                                    'Creating your account...'
                                ) : (
                                    <>
                                        Create Free Account <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-white/60">
                                Already have an account?{' '}
                                <Link
                                    href="/auth/login"
                                    className="text-white font-medium hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm text-white/50 hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Features List */}
                    <div className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                        <p className="text-sm font-medium text-white/90 mb-3">What you'll get:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-white/50" />
                                Blockchain-verified authentication
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-white/50" />
                                Access to instant liquidity marketplace
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-white/50" />
                                Fractional ownership opportunities
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
