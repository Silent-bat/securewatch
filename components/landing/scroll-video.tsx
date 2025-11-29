'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface ScrollVideoBackgroundProps {
    children: ReactNode;
}

export function ScrollVideoBackground({ children }: ScrollVideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const lastUpdateTime = useRef(0);

    // Track scroll of the entire page
    const { scrollYProgress } = useScroll();

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current && duration && isVideoLoaded) {
            const now = performance.now();
            // Throttle updates to every 16ms (60fps) for better performance
            if (now - lastUpdateTime.current < 16) return;
            lastUpdateTime.current = now;

            const time = latest * duration;
            if (Number.isFinite(time)) {
                const video = videoRef.current;
                // Only update if the time difference is significant (more than 0.1 seconds)
                if (Math.abs(video.currentTime - time) > 0.1) {
                    // Use fastSeek if available for better performance
                    if ('fastSeek' in video) {
                        (video as any).fastSeek(time);
                    } else {
                        video.currentTime = time;
                    }
                }
            }
        }
    });

    return (
        <>
            {/* Fixed Video Background - covers entire viewport, behind all content */}
            <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
                {/* Static background for mobile or loading state */}
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${isMobile || !isVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: 'url(/video-poster.jpg)' }}
                />

                {/* Only render video on desktop */}
                {!isMobile && (
                    <video
                        ref={videoRef}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        muted
                        playsInline
                        preload="auto"
                        poster="/video-poster.jpg"
                        style={{ willChange: 'auto' }}
                    >
                        <source src="/optimized-video.webm" type="video/webm" />
                    </video>
                )}
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text readability */}
            </div>

            {/* Children content (empty in this case, content is in the main page) */}
            {children}
        </>
    );
}
