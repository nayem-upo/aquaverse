'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        alert(`Subscribed with: ${email}`);
        setEmail("");
    };
    return (
        <div className='bg-[#0b1e70] pt-12'>
            <Image
                src="https://i.ibb.co/mK4D6Gw/Untitled-design-14.png"
                alt="Aqua Verse Logo"
                className='cursor-pointer mx-auto'
                width={90}
                height={90}
            />
            <div className="flex items-center justify-center gap-4 pt-16 pb-20">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-96 px-4 py-[14px] text-white bg-[#131f53] border border-transparent 
               hover:border-[#01B7DB] hover:ring-2 hover:ring-inset hover:ring-[#01B7DB] 
               focus:border-[#01B7DB] focus:ring-2 focus:ring-inset focus:ring-[#EFC12F] 
               transition duration-300 outline-none"
                />


                <button
                    onClick={handleSubscribe}
                    className="bg-[#EFC12F] text-xl text-[#131f53] py-3 px-6 cursor-pointer hover:bg-[#01B7DB] transition duration-300"
                >
                    Subscribe
                </button>
            </div>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
                {/* Column 1 */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Aqualots</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-[#01B7DB] transition duration-200">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[#01B7DB] transition duration-200">We’re Hiring</Link></li>
                        <li><Link href="/team" className="hover:text-[#01B7DB] transition duration-200">Our Team</Link></li>
                        <li><Link href="/company-info" className="hover:text-[#01B7DB] transition duration-200">Company Info</Link></li>
                        <li><Link href="/corporate" className="hover:text-[#01B7DB] transition duration-200">Corporate Info</Link></li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Customer Care</h3>
                    <ul className="space-y-2">
                        <li><Link href="/contact" className="hover:text-[#01B7DB] transition duration-200">Contact Us</Link></li>
                        <li><Link href="/how-we-work" className="hover:text-[#01B7DB] transition duration-200">How We Work</Link></li>
                        <li><Link href="/faq" className="hover:text-[#01B7DB] transition duration-200">Main Questions</Link></li>
                        <li><Link href="/info" className="hover:text-[#01B7DB] transition duration-200">Information</Link></li>
                        <li><Link href="/about-us" className="hover:text-[#01B7DB] transition duration-200">Get To Know Us</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Aquarium Info</h3>
                    <ul className="space-y-2">
                        <li><Link href="/maintenance" className="hover:text-[#01B7DB] transition">Maintenance</Link></li>
                        <li><Link href="/design" className="hover:text-[#01B7DB] transition">Aquarium Design</Link></li>
                        <li><Link href="/cleaning" className="hover:text-[#01B7DB] transition">Cleaning Services</Link></li>
                        <li><Link href="/supplies" className="hover:text-[#01B7DB] transition">Aquarium Supplies</Link></li>
                        <li><Link href="/health" className="hover:text-[#01B7DB] transition">Health Services</Link></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Ways To Shop</h3>
                    <ul className="space-y-2">
                        <li><Link href="/store" className="hover:text-[#01B7DB] transition">Our Store</Link></li>
                        <li><Link href="/cart" className="hover:text-[#01B7DB] transition">Shopping Cart</Link></li>
                        <li><Link href="/account" className="hover:text-[#01B7DB] transition">My Account</Link></li>
                        <li><Link href="/offers" className="hover:text-[#01B7DB] transition">Our Offers</Link></li>
                        <li><Link href="/sitemap" className="hover:text-[#01B7DB] transition">Sitemap</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-400 mt-8 border-t border-gray-600 py-5">
                &copy; {new Date().getFullYear()} Aqua Verse. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;