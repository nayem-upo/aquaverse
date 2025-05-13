'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';  // Ensure the correct path to your store
import Image from 'next/image';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Access cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarBg = scrolled ? 'bg-[#0b1d70d6]' : 'bg-transparent';
    const menuColor = scrolled ? 'text-white' : (isHome ? 'text-white' : 'text-[#0B1E70]');

    return (
        <>
            {/* Navbar */}
            <nav
                className={`${navbarBg} top-0 left-0 right-0 z-50 flex items-center justify-around px-6 py-4 fixed transition-colors duration-300`}
            >
                {/* Menu Icon (Left) */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className={`text-xl cursor-pointer flex items-center gap-2 hover:text-[#01B7DB] duration-200 ${menuColor}`}
                >
                    <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />
                    Menu
                </button>

                {/* Logo (Center) */}
                <Link href="/">
                    <Image
                        src="https://i.ibb.co/mK4D6Gw/Untitled-design-14.png"
                        alt="Aqua Verse Logo"
                        className="cursor-pointer"
                        width={80}
                        height={80}
                    />
                </Link>

                {/* Cart Icon (Right) */}
                <div className={`relative text-2xl cursor-pointer ${menuColor}`}>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-2xl cursor-pointer hover:text-[#01B7DB] duration-200"
                    />
                    {/* Cart Item Count */}
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </div>
            </nav>

            {/* Animated Full-Screen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-[#0b1e70] bg-opacity-90 flex flex-col items-center justify-center text-white text-2xl z-50"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-5 right-5 text-3xl hover:scale-125 cursor-pointer hover:text-[#01B7DB] duration-200"
                        >
                            ✖
                        </button>

                        {/* Menu Links */}
                        <ul className="space-y-6 text-4xl">
                            <li
                                className="hover:text-[#01B7DB] duration-200 cursor-pointer hover:scale-105"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Link href="/">Home</Link>
                            </li>
                            <li className="hover:text-[#01B7DB] duration-200 cursor-pointer hover:scale-105" onClick={() => setMenuOpen(false)}>About Us</li>
                            <li className="hover:text-[#01B7DB] duration-200 cursor-pointer hover:scale-105" onClick={() => setMenuOpen(false)}>Shop Now</li>
                            <li className="hover:text-[#01B7DB] duration-200 cursor-pointer hover:scale-105" onClick={() => setMenuOpen(false)}>Contact Us</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
