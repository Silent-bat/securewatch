'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Added Link import for the "View Details" button if it were to link somewhere
import { BlockchainVerification } from '@/components/blockchain-verification';

interface MarketplaceListing {
    id: string;
    brand: string;
    model: string;
    year: number;
    condition: string;
    description: string;
    photos: string[];
    nft?: {
        tokenId: string;
        contractAddress: string;
        blockchainTxHash?: string;
    };
    listing: {
        price: number;
        active: boolean;
    };
    owner: {
        name: string;
        email: string;
    };
}

export default function MarketplacePage() {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await apiClient.get('/watches/marketplace');
            setListings(response.data);
        } catch (err) {
            console.error('Failed to fetch listings:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="container py-24">Loading...</div>;
    }

    return (
        <div className="container py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <p className="text-muted-foreground">
                    Browse verified luxury watches available for purchase
                </p>
            </div>

            {listings.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No Listings Yet</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Check back soon for verified watches
                        </p>
                        {/* The original "Submit Your Watch" button was removed from this section in the new structure */}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <Card key={listing.id} className="overflow-hidden">
                            <div className="aspect-video relative bg-muted">
                                <img
                                    src={listing.photos[0]}
                                    alt={`${listing.brand} ${listing.model}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{listing.brand} {listing.model}</CardTitle>
                                <CardDescription>
                                    {listing.year} • {listing.condition}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {listing.nft && (
                                    <BlockchainVerification
                                        tokenId={listing.nft.tokenId}
                                        blockchainTxHash={listing.nft.blockchainTxHash}
                                        contractAddress={listing.nft.contractAddress}
                                    />
                                )}

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {listing.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-bold">
                                        ${listing.listing.price.toLocaleString()}
                                    </p>
                                    <Button>View Details</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
