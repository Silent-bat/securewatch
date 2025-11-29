'use client';

import { ExternalLink } from 'lucide-react';

interface BlockchainVerificationProps {
    tokenId?: string;
    blockchainTxHash?: string;
    contractAddress?: string;
    verifiedAt?: Date;
    className?: string;
}

export function BlockchainVerification({
    tokenId,
    blockchainTxHash,
    contractAddress,
    verifiedAt,
    className = '',
}: BlockchainVerificationProps) {
    if (!blockchainTxHash) {
        return null;
    }

    const explorerUrl = `https://polygonscan.com/tx/${blockchainTxHash}`;

    return (
        <div className={`rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 ${className}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="font-semibold text-green-900 dark:text-green-100">
                            ✓ Blockchain Verified
                        </h3>
                    </div>

                    <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                        {tokenId && (
                            <p>
                                <span className="font-medium">Token ID:</span> #{tokenId}
                            </p>
                        )}
                        {verifiedAt && (
                            <p>
                                <span className="font-medium">Verified:</span>{' '}
                                {new Date(verifiedAt).toLocaleDateString()}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Immutable proof of authenticity stored on Polygon blockchain
                        </p>
                    </div>
                </div>

                <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100 transition-colors"
                >
                    <span>View on Explorer</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
