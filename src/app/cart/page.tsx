'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromCart, addToCart } from '../../../redux/cartSlice';
import Link from 'next/link';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [deliveryOption, setDeliveryOption] = useState<'inside' | 'outside'>('inside');
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherError, setVoucherError] = useState('');
    const [discount, setDiscount] = useState(0);

    const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value);
        setVoucherError('');
    };

    const handleApplyVoucher = () => {
        if (voucherCode.trim().toLowerCase() === 'aquaverse20') {
            setDiscount(0.2);
            setVoucherError('');
        } else {
            setDiscount(0);
            setVoucherError('Invalid voucher code. Please try again.');
        }
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) return;
        const item = cartItems.find(item => item.id === id);
        if (item) {
            dispatch(addToCart({ ...item, quantity }));
        }
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const deliveryFee = deliveryOption === 'inside' ? 80 : 120;
        const discountedSubtotal = subtotal * (1 - discount);
        return discountedSubtotal + deliveryFee;
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen pt-32">
            <div className="flex flex-col lg:flex-row">
                {/* Cart Items */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-center text-[#182052] mb-6">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex items-center w-1/3">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4 rounded-lg" />
                                        <div>
                                            <Link href={`/products/${item.id}`}>
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                            </Link>
                                            <p className="text-[#EFC131] font-semibold">{item.price} TK</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-1/6">
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer" disabled={item.quantity <= 1}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer">+</button>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-700 w-1/12 cursor-pointer"><FontAwesomeIcon icon={faTrashCan} className="text-2xl" /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 lg:ml-8 bg-white p-6 rounded-lg shadow-md mt-10 lg:mt-0">
                    <h2 className="text-2xl font-semibold text-[#182052] mb-4">Order Summary</h2>

                    <div className="flex justify-between mb-2">
                        <span>Subtotal ({cartItems.length} items):</span>
                        <span>{calculateSubtotal().toFixed(2)} TK</span>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-1">Delivery Options</h3>
                        <label className="block mb-2">
                            <input type="radio" name="delivery" value="inside" checked={deliveryOption === 'inside'} onChange={() => setDeliveryOption('inside')} />
                            <span className="ml-2">Inside Dhaka (80 TK)</span>
                        </label>
                        <label>
                            <input type="radio" name="delivery" value="outside" checked={deliveryOption === 'outside'} onChange={() => setDeliveryOption('outside')} />
                            <span className="ml-2">Outside Dhaka (120 TK)</span>
                        </label>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            value={voucherCode}
                            onChange={handleVoucherChange}
                            placeholder="Enter Voucher Code"
                            className="w-full p-2 border rounded"
                        />
                        <button onClick={handleApplyVoucher} className="w-full bg-[#01B7DB] text-white py-2 mt-2 rounded hover:bg-[#0197c7]">
                            Apply Voucher
                        </button>
                        {voucherError && <p className="text-red-500 mt-1">{voucherError}</p>}
                    </div>

                    <div className="flex justify-between mt-4 font-semibold">
                        <span>Total:</span>
                        <span>{calculateTotal().toFixed(2)} TK</span>
                    </div>

                    <Link href="/checkout">
                        <button className="w-full cursor-pointer mt-6 bg-[#01B7DB] text-white py-3 rounded hover:bg-[#0197c7] transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
