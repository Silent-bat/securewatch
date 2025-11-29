'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

interface ScrollVideoBackgroundProps {
    children: ReactNode;
}

export function ScrollVideoBackground({ children }: ScrollVideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Track scroll of the entire page
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Set up video event handlers
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsVideoLoaded(true);
        };

        const handleCanPlay = () => {
            setIsVideoLoaded(true);
        };

        // Ensure metadata is loaded to get duration
        if (video.readyState >= 1) {
            setDuration(video.duration);
            setIsVideoLoaded(true);
        } else {
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('canplay', handleCanPlay);
        }

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const springScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(springScroll, "change", (latest) => {
        if (videoRef.current && duration && isVideoLoaded) {
            const time = latest * duration;
            if (Number.isFinite(time)) {
                // Use fastSeek if available for better performance
                if ('fastSeek' in videoRef.current) {
                    (videoRef.current as any).fastSeek(time);
                } else {
                    (videoRef.current as HTMLVideoElement).currentTime = time;
                }
            }
        }
    });

    return (
        <>
            {/* Fixed Video Background - covers entire viewport, behind all content */}
            <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
                {/* Loading placeholder */}
                {!isVideoLoaded && (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(/video-poster.jpg)' }}
                    />
                )}

                <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    muted
                    playsInline
                    preload="metadata"
                    poster="/video-poster.jpg"
                >
                    <source src="/optimized-video.webm" type="video/webm" />
                    <source src="/optimized-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text readability */}
            </div>

            {/* Children content (empty in this case, content is in the main page) */}
            {children}
        </>
    );
}
