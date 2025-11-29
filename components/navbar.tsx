'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="mr-8 flex items-center space-x-2">
                    <span className="font-bold text-xl">SecureWatch</span>
                </Link>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-6">
                        <Link
                            href="/marketplace"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Marketplace
                        </Link>
                        {user && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/submit"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Submit Watch
                                </Link>
                            </>
                        )}
                        {user?.role === 'ADMIN' && (
                            <Link
                                href="/admin"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Admin
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm text-muted-foreground">
                                    {user.email}
                                </span>
                                <Button onClick={logout} variant="outline" size="sm">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href="/auth/register">Register</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
