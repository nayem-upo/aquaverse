'use client'

import React, { useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { products } from "../static data/products";

const ProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex < products.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <section>
            <div className="mx-32 px-4">
                <div className="flex gap-16 items-center justify-between">
                    <div className="flex gap-4">
                        <button onClick={prevSlide} className="...">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={nextSlide} className="...">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="relative overflow-hidden w-full">
                        <div className="flex gap-2 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}>
                            {products.map((product, idx) => (
                                <div key={idx} className="w-1/3 h-[400px] bg-white flex-shrink-0 px-2">
                                    <Link href={`/products/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover p-10 w-full h-full rounded-lg cursor-pointer hover:scale-125 duration-500"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSlider;
