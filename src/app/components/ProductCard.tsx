'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';

type Product = {
    id: string;
    name: string;
    price: string;
    images: string[];
};

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
            })
        );
    };

    return (
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 text-center">
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-60 w-full object-contain mb-4 transition-transform duration-300 hover:scale-110"
                />
            </Link>
            <h3 className="text-[#182052] font-bold text-lg">{product.name}</h3>
            <p className="text-[#EFC131] font-semibold mb-3">{product.price}</p>

            <div className="flex flex-col text-sm">
                <button
                    onClick={handleAddToCart}
                    className="transition-all cursor-pointer border duration-300 hover:border-[#01B7DB] hover:text-[#01B7DB] px-6 bg-[#01B7DB] hover:bg-white text-white font-bold py-2 rounded-t"
                >
                    ADD TO CART
                </button>
                <Link href={`/products/${product.id}`}>
                    <button className="transition-all w-full cursor-pointer border duration-300 hover:border-[#01B7DB] hover:text-[#01B7DB] px-6 bg-[#01B7DB] hover:bg-white text-white font-bold py-2 rounded-b">
                        BUY NOW
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
