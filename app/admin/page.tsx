'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Watch {
    id: string;
    brand: string;
    model: string;
    serialNumber: string;
    year: number;
    condition: string;
    description: string;
    photos: string[];
    status: string;
    owner: {
        id: string;
        email: string;
        name: string;
    };
    createdAt: string;
}

export default function AdminPage() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const [watches, setWatches] = useState<Watch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'ADMIN')) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetchPendingWatches();
        }
    }, [user]);

    const fetchPendingWatches = async () => {
        try {
            const response = await apiClient.get('/watches/pending');
            setWatches(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch pending watches');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (watchId: string) => {
        try {
            await apiClient.patch(`/watches/${watchId}/verify`, {
                verificationDoc: 'Qm...verificationCID' // In production, this would be an actual IPFS CID
            });
            // Remove from list
            setWatches(prev => prev.filter(w => w.id !== watchId));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to verify watch');
        }
    };

    const handleReject = async (watchId: string) => {
        try {
            await apiClient.patch(`/watches/${watchId}/reject`);
            // Remove from list
            setWatches(prev => prev.filter(w => w.id !== watchId));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to reject watch');
        }
    };

    if (isLoading || loading) {
        return <div className="container py-24">Loading...</div>;
    }

    if (!user || user.role !== 'ADMIN') {
        return null;
    }

    return (
        <div className="container py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">
                    Review and verify pending watch submissions
                </p>
            </div>

            {error && (
                <div className="p-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                    {error}
                </div>
            )}

            {watches.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No pending watches to review</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {watches.map((watch) => (
                        <Card key={watch.id}>
                            <CardHeader>
                                <CardTitle>{watch.brand} {watch.model}</CardTitle>
                                <CardDescription>
                                    Submitted by {watch.owner.name || watch.owner.email}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Serial Number:</span> {watch.serialNumber}
                                    </div>
                                    <div>
                                        <span className="font-medium">Year:</span> {watch.year}
                                    </div>
                                    <div>
                                        <span className="font-medium">Condition:</span> {watch.condition}
                                    </div>
                                    <div>
                                        <span className="font-medium">Status:</span>{' '}
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                            {watch.status}
                                        </span>
                                    </div>
                                </div>

                                {watch.description && (
                                    <div>
                                        <span className="font-medium text-sm">Description:</span>
                                        <p className="text-sm text-muted-foreground mt-1">{watch.description}</p>
                                    </div>
                                )}

                                <div>
                                    <span className="font-medium text-sm">Photos:</span>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {watch.photos.map((photo, idx) => (
                                            <img
                                                key={idx}
                                                src={photo}
                                                alt={`${watch.brand} ${watch.model} photo ${idx + 1}`}
                                                className="w-full h-24 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        onClick={() => handleVerify(watch.id)}
                                        className="flex-1"
                                    >
                                        Approve & Verify
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleReject(watch.id)}
                                        className="flex-1"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
