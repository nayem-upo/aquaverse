'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../static data/testimonials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function TestimonialSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = testimonials[selectedIndex];
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const maxHeight = Math.max(...testimonials.map(t => t.text.length));
            contentRef.current.style.minHeight = `${Math.ceil(maxHeight / 2)}px`;
        }
    }, []);

    useEffect(() => {
        if (selectedIndex === visibleIndex) return;
        setIsFading(true);
        const timeout = setTimeout(() => {
            setVisibleIndex(selectedIndex);
            setIsFading(false);
        }, 300); // Matches fade duration
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    return (
        <section className="bg-[#002366] text-white py-16 px-6 md:px-20 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <div className="relative w-full h-96">
                    <Image
                        src="https://w0.peakpx.com/wallpaper/7/661/HD-wallpaper-betta-fish-fish-betta-red-blue.jpg"
                        alt="Sea Turtle"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <a
                        href="https://www.youtube.com/@aquaversebd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-6 left-6 bg-cyan-400 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-cyan-500 transition duration-200"
                    >
                        <FontAwesomeIcon
                            icon={faCamera}
                            className="text-2xl cursor-pointer hover:text-[#01B7DB] duration-200"
                        />
                        WATCH VIDEO
                    </a>
                </div>

                {/* Right: Testimonial */}
                <div className="text-center md:text-left">
                    <p className="text-yellow-400 text-xl font-semibold mb-2">What Clients Say</p>
                    <h2 className="text-4xl font-extrabold mb-4">TESTIMONIALS</h2>
                    <div className="h-1 w-12 bg-cyan-400 mx-auto md:mx-0 mb-6 rounded-full" />

                    {/* Smooth text transition */}
                    <div
                        className={`transition-all duration-500 ease-in-out min-h-[100px] transform ${isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                            }`}
                    >
                        <p className="italic text-lg max-w-xl mx-auto md:mx-0">
                            {testimonials[visibleIndex].text}
                        </p>
                    </div>

                    {/* Customer selectors */}
                    <div className="mt-8 flex items-center justify-center md:justify-start gap-8">
                        {testimonials.map((t, index) => {
                            const isActive = index === selectedIndex;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`rounded-full transition-all duration-500 ease-in-out transform ${isActive
                                        ? 'scale-150 border-yellow-400'
                                        : 'scale-95 opacity-50 brightness-75 border-transparent'
                                        } border-2`}
                                >
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full object-cover h-12 w-12 cursor-pointer"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-6 font-bold text-lg">{selected.name}</p>
                </div>
            </div>

            {/* Optional: Wave Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('/images/wave.svg')] bg-repeat-x" />
        </section>
    );
}
