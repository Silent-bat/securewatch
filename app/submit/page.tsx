'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import Link from 'next/link';

export default function SubmitWatchPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        serialNumber: '',
        year: new Date().getFullYear(),
        condition: '',
        description: '',
        photos: [] as string[],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await apiClient.post('/watches', formData);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit watch');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePhotoUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const urls = e.target.value.split('\n').filter(url => url.trim());
        setFormData(prev => ({ ...prev, photos: urls }));
    };

    if (!user) {
        return (
            <div className="container py-24 text-center">
                <p className="text-lg">Please <Link href="/auth/login" className="text-primary underline">login</Link> to submit a watch.</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="container py-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Submit Your Watch</CardTitle>
                        <CardDescription>
                            Provide details about your luxury watch for authentication
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand *</Label>
                                    <Input
                                        id="brand"
                                        name="brand"
                                        placeholder="e.g., Rolex"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="model">Model *</Label>
                                    <Input
                                        id="model"
                                        name="model"
                                        placeholder="e.g., Submariner"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="serialNumber">Serial Number *</Label>
                                <Input
                                    id="serialNumber"
                                    name="serialNumber"
                                    placeholder="Unique serial number"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year *</Label>
                                    <Input
                                        id="year"
                                        name="year"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition *</Label>
                                    <Input
                                        id="condition"
                                        name="condition"
                                        placeholder="e.g., Excellent"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Additional details about the watch"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photos">Photo URLs (one per line) *</Label>
                                <textarea
                                    id="photos"
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                                    onChange={handlePhotoUrlsChange}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter image URLs, one per line. For demo purposes, you can use any image URL.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
