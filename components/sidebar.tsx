'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

interface SidebarProps {
    className?: string;
}

const navItems = [
    {
        title: 'Overview',
        href: '/dashboard',
        icon: '📊',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'My Watches',
        href: '/dashboard/watches',
        icon: '⌚',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'Submit Watch',
        href: '/submit',
        icon: '➕',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'Marketplace',
        href: '/marketplace',
        icon: '🛍️',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'My Listings',
        href: '/dashboard/listings',
        icon: '📝',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'Purchases',
        href: '/dashboard/purchases',
        icon: '💰',
        roles: ['USER', 'ADMIN'],
    },
    {
        title: 'Admin Panel',
        href: '/admin',
        icon: '🔐',
        roles: ['ADMIN'],
    },
];

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useAuth();

    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(user?.role || 'USER')
    );

    return (
        <div className={cn('pb-12 w-64 border-r bg-muted/40', className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-2 mb-4"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl">
                                ⌚
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">SecureWatch</h2>
                                <p className="text-xs text-muted-foreground">Luxury Watch NFTs</p>
                            </div>
                        </Link>

                        <div className="space-y-1">
                            {filteredNavItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                                            isActive
                                                ? 'bg-accent text-accent-foreground font-medium'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="px-3 py-2">
                    <div className="rounded-lg border bg-card p-4">
                        <h3 className="text-sm font-medium mb-2">Account</h3>
                        <div className="space-y-1 text-xs text-muted-foreground">
                            <p className="truncate">{user?.email}</p>
                            <p className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary w-fit">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
