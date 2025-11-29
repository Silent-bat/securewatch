'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface ScrollWebGLBackgroundProps {
    children: ReactNode;
}

export function ScrollWebGLBackground({ children }: ScrollWebGLBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const textureRef = useRef<WebGLTexture | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);

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

    // Initialize WebGL and load frames
    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (glRef.current) {
                glRef.current.viewport(0, 0, canvas.width, canvas.height);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize WebGL
        const gl = canvas.getContext('webgl', { 
            alpha: false, 
            antialias: false,
            powerPreference: 'high-performance'
        });
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }
        glRef.current = gl;

        // Vertex shader - simple quad that covers the screen
        const vertexShaderSource = `
            attribute vec2 position;
            varying vec2 vTexCoord;
            void main() {
                vTexCoord = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        // Fragment shader - display texture
        const fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D uTexture;
            varying vec2 vTexCoord;
            void main() {
                gl_FragColor = texture2D(uTexture, vec2(vTexCoord.x, 1.0 - vTexCoord.y));
            }
        `;

        // Compile shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        // Create program
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        programRef.current = program;

        // Set up geometry (full-screen quad)
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Create texture
        const texture = gl.createTexture();
        textureRef.current = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Load frames (every 7th frame = 65 frames total for 450 frame video)
        const frameCount = 65;
        const frames: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            const frameNum = String(i + 1).padStart(3, '0');
            img.src = `/frames/frame_${frameNum}.jpg`;
            
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            
            img.onerror = () => {
                console.error(`Failed to load frame ${frameNum}`);
            };
            
            frames.push(img);
        }
        framesRef.current = frames;

        return () => {
            window.removeEventListener('resize', resize);
            if (gl) {
                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.deleteTexture(texture);
                gl.deleteBuffer(positionBuffer);
            }
        };
    }, [isMobile]);

    // Update frame based on scroll
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (isMobile || !isLoaded) return;

        const gl = glRef.current;
        const texture = textureRef.current;
        const frames = framesRef.current;

        if (!gl || !texture || frames.length === 0) return;

        // Calculate which frame to show
        const frameIndex = Math.floor(progress * (frames.length - 1));
        const frame = frames[Math.max(0, Math.min(frameIndex, frames.length - 1))];

        if (!frame.complete) return;

        // Upload texture to GPU
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame);

        // Draw
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });

    return (
        <>
            {/* Fixed WebGL Background */}
            <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
                {/* Static background for mobile or loading state */}
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
                        isMobile || !isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: 'url(/video-poster.jpg)' }}
                />

                {/* WebGL Canvas for desktop */}
                {!isMobile && (
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                            isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ objectFit: 'cover' }}
                    />
                )}
                
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {children}
        </>
    );
}
