'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
    // Sample text content for the slider
    const sliderData = [
        {
            text: "Transform Your Space with AquaVerse",
            image: "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            buttonText: "Shop Now"
        },
        {
            text: "Welcome to AquaVerse",
            image: "https://images.unsplash.com/photo-1729544676664-fd2e8492db8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            buttonText: "Shop Now"
        },
        {
            text: "Explore Premium Aquarium Products",
            image: "https://images.unsplash.com/photo-1552461536-6c6fed9d94a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            buttonText: "Shop Now"
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle next and previous slide navigation
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + sliderData.length) % sliderData.length
        );
    };

    return (
        <section
            className="relative h-screen bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
                backgroundImage: `url(${sliderData[currentIndex].image})`, // Dynamically change background image
            }}
        >
            {/* Blueish Overlay */}
            <div className="absolute inset-0 bg-[#0f0f3f] opacity-50"></div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
                {/* Text Slider */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-4xl font-bold mb-4"
                >
                    {sliderData[currentIndex].text}
                </motion.div>

                {/* Navigation Icons */}
                <div className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10">
                    <button
                        onClick={prevSlide}
                        className="bg-[#EFC12F] text-xl font-semibold text-white p-3 rounded cursor-pointer hover:bg-[#01B7DB] transition duration-300"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>

                <div className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10">
                    <button
                        onClick={nextSlide}
                        className="bg-[#EFC12F] text-xl font-semibold text-white p-3 rounded cursor-pointer hover:bg-[#01B7DB] transition duration-300"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                {/* Button (Changes per slide) */}
                <Link
                    href="/shop"
                    className="bg-[#EFC12F] text-xl font-semibold text-white py-3 px-6 rounded hover:bg-[#01B7DB] transition duration-300 mt-6"
                >
                    {sliderData[currentIndex].buttonText}
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
