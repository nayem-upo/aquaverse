'use client';

import React, { useState, useRef } from 'react';
import { products } from '../static data/products';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ id }: { id: string }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');
    const product = products.find(p => p.id === id);

    const [mainImage, setMainImage] = useState(product?.images?.[0] || '');
    const imageRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);

    if (!product) {
        return <div className="px-8 py-20 text-center text-red-500">Product not found.</div>;
    }

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        setQuantity(prev => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const imageContainer = imageRef.current;
        const zoomedImage = imageContainer?.querySelector('img');

        if (imageContainer && zoomedImage) {
            const { left, top, width, height } = imageContainer.getBoundingClientRect();
            const offsetX = e.clientX - left;
            const offsetY = e.clientY - top;

            const zoomScale = 1.7;

            zoomedImage.style.transform = `scale(${zoomScale})`;
            zoomedImage.style.transformOrigin = `${(offsetX / width) * 100}% ${(offsetY / height) * 100}%`;
        }
    };

    const handleMouseLeave = () => {
        const zoomedImage = imageRef.current?.querySelector('img');
        if (zoomedImage) {
            zoomedImage.style.transform = 'scale(1)';
        }
    };

    const handleMouseEnter = () => {
        const lens = lensRef.current;
        if (lens) {
            lens.style.visibility = 'visible'; // Show lens on hover
        }
    };


    return (
        <div className="px-8 lg:px-32 py-20 bg-white pt-36">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Image Section */}
                <div
                >
                    <div
                        ref={imageRef}
                        className="relative w-[500px] h-[500px] overflow-hidden rounded-xl"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={mainImage}
                                src={mainImage}
                                alt={product.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="object-cover w-full h-full rounded-xl absolute transition-transform duration-300"
                            />
                        </AnimatePresence>
                        <div className="absolute top-4 right-4 rounded-full">
                            <FontAwesomeIcon icon={faSearchPlus} className="text-xl text-[#01B7DB]" />
                        </div>

                        <div
                            ref={lensRef}
                            className="absolute pointer-events-none"
                            style={{ visibility: 'hidden' }}
                        ></div>

                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-4">
                        {product.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`${product.name} thumbnail ${index}`}
                                width={100}
                                height={100}
                                onClick={() => setMainImage(img)}
                                className={`cursor-pointer rounded-md border-2 ${mainImage === img ? 'border-[#01B7DB]' : 'border-transparent'} hover:border-[#01B7DB]`}
                            />
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-4xl font-bold text-[#182052]">{product.name}</h1>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <p className="text-2xl text-[#EFC131] font-semibold">{product.price}</p>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-[#182052]">Option</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Choose an option</option>
                            <option>Adult</option>
                            <option>Fry</option>
                        </select>
                    </div>

                    {/* Quantity + Buttons */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button onClick={() => handleQuantityChange('dec')} className="cursor-pointer duration-300 px-3 py-2 text-xl font-bold bg-gray-100 hover:bg-gray-200">−</button>
                            <div className="px-5 py-2 w-16 text-center">{quantity}</div>
                            <button onClick={() => handleQuantityChange('inc')} className="cursor-pointer duration-300 px-3 py-2 text-xl font-bold bg-gray-100 hover:bg-gray-200">+</button>
                        </div>

                        <button className="bg-[#01B7DB] hover:bg-[#0099c5] duration-300 text-white cursor-pointer font-bold py-3 px-8 rounded-lg transition-all">
                            BUY NOW
                        </button>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="cursor-pointer border duration-300 border-[#01B7DB] text-[#01B7DB] px-6 py-2 rounded hover:bg-[#01B7DB] hover:text-white">Compare</button>
                        <button className="cursor-pointer border duration-300 border-[#01B7DB] text-[#01B7DB] px-6 py-2 rounded hover:bg-[#01B7DB] hover:text-white">Add to Wishlist</button>
                    </div>

                    <div className="mt-6 text-sm text-gray-500 space-y-1">
                        <p><strong>SKU:</strong> {product.id}</p>
                        <p><strong>Category:</strong> Half Moon Fish</p>
                        <p><strong>Tags:</strong> betta, for profit</p>
                        <p><strong>Product ID:</strong> {product.id}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-16">
                <div className="flex gap-6 border-b-2">
                    {['description', 'additional', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`pb-2 font-semibold capitalize cursor-pointer ${activeTab === tab ? 'text-[#182052] border-b-2 border-[#182052]' : 'text-gray-500 hover:text-[#182052]'}`}
                        >
                            {tab === 'additional' ? 'Additional Information' : tab === 'reviews' ? 'Reviews (0)' : 'Description'}
                        </button>
                    ))}
                </div>

                <div className="mt-6 text-gray-600">
                    {activeTab === 'description' && <p>{product.description}</p>}
                    {activeTab === 'additional' && <p>{product.additionalInfo}</p>}
                    {activeTab === 'reviews' && <p>No reviews yet. Be the first to leave a review!</p>}
                </div>
            </div>

            {/* Related Products Placeholder */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-[#182052] mb-6">RELATED PRODUCTS</h2>
                {/* <ProductSlider /> */}
            </div>
        </div>
    );
};

export default ProductDetail;
