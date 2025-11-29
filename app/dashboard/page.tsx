'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard-layout';
import Link from 'next/link';

interface Watch {
    id: string;
    brand: string;
    model: string;
    status: string;
    year: number;
    nft?: {
        tokenId: string;
        contractAddress: string;
        blockchainTxHash?: string;
    };
    listing?: {
        price: number;
        active: boolean;
    };
}

export default function DashboardPage() {
    const [watches, setWatches] = useState<Watch[]>([]);
    const [loadingWatches, setLoadingWatches] = useState(true);
    const [stats, setStats] = useState({
        totalValue: 0,
        verified: 0,
        pending: 0,
    });

    useEffect(() => {
        fetchMyWatches();
    }, []);

    const fetchMyWatches = async () => {
        try {
            const response = await apiClient.get('/watches/my-watches');
            setWatches(response.data);

            // Calculate stats
            const verified = response.data.filter((w: Watch) => w.status === 'VERIFIED' || w.status === 'MINTED' || w.status === 'LISTED').length;
            const pending = response.data.filter((w: Watch) => w.status === 'PENDING_VERIFICATION').length;
            const totalValue = response.data
                .filter((w: Watch) => w.listing?.active)
                .reduce((sum: number, w: Watch) => sum + (w.listing?.price || 0), 0);

            setStats({ verified, pending, totalValue });
        } catch (err) {
            console.error('Failed to fetch watches:', err);
        } finally {
            setLoadingWatches(false);
        }
    };

    const myListings = watches.filter(w => w.listing?.active);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VERIFIED':
            case 'MINTED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'PENDING_VERIFICATION':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'LISTED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <DashboardLayout>
            <div className="container py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Watches</CardTitle>
                            <span className="text-2xl">⌚</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{watches.length}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.verified} verified, {stats.pending} pending
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                            <span className="text-2xl">📝</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{myListings.length}</div>
                            <p className="text-xs text-muted-foreground">
                                On marketplace
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                Marketplace value
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                            <span className="text-2xl">⚡</span>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full" size="sm">
                                <Link href="/submit">Submit Watch</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Watches Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Watches</CardTitle>
                            <CardDescription>Your submitted luxury watches</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loadingWatches ? (
                                <p className="text-muted-foreground">Loading...</p>
                            ) : watches.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">No watches submitted yet</p>
                                    <Button asChild variant="outline">
                                        <Link href="/submit">Submit Your First Watch</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {watches.slice(0, 5).map((watch) => (
                                        <div key={watch.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                                            <div className="flex-1">
                                                <p className="font-medium">{watch.brand} {watch.model}</p>
                                                <p className="text-sm text-muted-foreground">{watch.year}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {watch.listing && (
                                                    <p className="text-sm font-medium">${watch.listing.price.toLocaleString()}</p>
                                                )}
                                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(watch.status)}`}>
                                                    {watch.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {watches.length > 5 && (
                                        <Button variant="ghost" className="w-full" asChild>
                                            <Link href="/dashboard/watches">View All ({watches.length})</Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest updates on your watches</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {watches.slice(0, 3).map((watch) => (
                                    <div key={watch.id} className="flex items-start gap-3 p-3 rounded-lg border">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xl">
                                            ⌚
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{watch.brand} {watch.model}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Status: {watch.status.replace('_', ' ')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {watches.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No activity yet
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
