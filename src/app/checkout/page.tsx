'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

// Step 1: Define form type
type FormDataType = {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    postcode: string;
    phone: string;
    email: string;
};

type FormField = keyof FormDataType;

const CheckoutPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [deliveryOption, setDeliveryOption] = useState<'inside' | 'outside'>('inside');
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherError, setVoucherError] = useState('');
    const [discount, setDiscount] = useState(0);
    const [termsChecked, setTermsChecked] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        postcode: '',
        phone: '',
        email: '',
    });

    const [formErrors, setFormErrors] = useState<Partial<Record<FormField | 'terms' | 'cart', string>>>({});

    const handleInputChange = (field: FormField, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const errors: Partial<Record<FormField | 'terms' | 'cart', string>> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!termsChecked) errors.terms = 'You must accept the terms and conditions';
        if (cartItems.length === 0) errors.cart = 'Your cart is empty';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        setFormValid(validateForm());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, termsChecked, cartItems]);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    };

    const calculateDiscountedSubtotal = () => {
        return calculateSubtotal() * (1 - discount);
    };

    const calculateTotal = () => {
        const deliveryFee = deliveryOption === 'inside' ? 80 : 120;
        return calculateDiscountedSubtotal() + deliveryFee;
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

    const handlePlaceOrder = () => {
        if (validateForm()) {
            alert('Order placed successfully!');
            // redirect logic can go here
        }
    };

    return (
        <div className="container mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Billing Details */}
                <form className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                            {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                            {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Country</label>
                        <input
                            type="text"
                            defaultValue="Bangladesh"
                            readOnly
                            className="w-full mt-1 p-2 border rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Street Address</label>
                        <input
                            type="text"
                            value={formData.streetAddress}
                            onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {formErrors.streetAddress && <p className="text-red-500 text-sm">{formErrors.streetAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Town / City</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                            {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Postcode / ZIP</label>
                            <input
                                type="text"
                                value={formData.postcode}
                                onChange={(e) => handleInputChange('postcode', e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Order Notes</label>
                        <textarea
                            className="w-full mt-1 p-2 border rounded"
                            rows={3}
                            placeholder="Notes about your order, delivery instructions, etc."
                        />
                    </div>
                </form>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4 h-fit">
                    <h2 className="text-2xl font-semibold mb-4">Your Order</h2>

                    <ul className="divide-y">
                        {cartItems.map((item) => (
                            <li key={item.id} className="py-2 flex justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">× {item.quantity}</p>
                                </div>
                                <span>{(parseFloat(item.price) * item.quantity).toFixed(2)} TK</span>
                            </li>
                        ))}
                    </ul>

                    {formErrors.cart && <p className="text-red-500 text-sm">{formErrors.cart}</p>}

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between font-medium">
                            <span>Subtotal</span>
                            <span>{calculateSubtotal().toFixed(2)} TK</span>
                        </div>

                        <div>
                            <input
                                type="text"
                                value={voucherCode}
                                onChange={(e) => {
                                    setVoucherCode(e.target.value);
                                    setVoucherError('');
                                }}
                                placeholder="Enter Voucher Code"
                                className="w-full p-2 border rounded mt-2"
                            />
                            <button
                                type="button"
                                onClick={handleApplyVoucher}
                                className="w-full bg-[#01B7DB] text-white py-2 mt-2 rounded hover:bg-[#0197c7]"
                            >
                                Apply Voucher
                            </button>
                            {voucherError && <p className="text-red-500 text-sm mt-1">{voucherError}</p>}
                            {discount > 0 && (
                                <p className="text-green-600 text-sm mt-1">
                                    Voucher applied! You saved {(calculateSubtotal() * discount).toFixed(2)} TK.
                                </p>
                            )}
                        </div>

                        <div className="space-y-1 mt-4">
                            <p className="font-medium">Delivery</p>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="inside"
                                    checked={deliveryOption === 'inside'}
                                    onChange={() => setDeliveryOption('inside')}
                                />
                                <span className="ml-2">Inside Dhaka (80 TK)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="outside"
                                    checked={deliveryOption === 'outside'}
                                    onChange={() => setDeliveryOption('outside')}
                                />
                                <span className="ml-2">Outside Dhaka (120 TK)</span>
                            </label>
                        </div>

                        <div className="flex justify-between font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>{calculateTotal().toFixed(2)} TK</span>
                        </div>
                    </div>

                    <div className="pt-6 pb-4">
                        <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
                        <p className="text-sm text-red-500 mb-2 font-bold">ক্রয় করার পূর্বে অবশ্যই পড়ুন-</p>

                        <div className="text-sm text-gray-700 space-y-2">
                            <div>
                                <p className='font-bold pb-1'>★ লাইভ ফিশ সংক্রান্ত:</p>
                                <span className=''>
                                    লাইভ পার্সেল আনবক্স করাকালীন সময় অবশ্যই ভিডিও করবেন। ভিডিও ছাড়া কোনো অভিযোগ গ্রহণযোগ্য হবে না।<br />
                                    ফিশ ডেলিভারির সময় যদি কোনো মাছ মৃত থাকে, তাহলে ভিডিও প্রমাণ দেখিয়ে ৬ ঘণ্টার মধ্যে আমাদের ফেসবুক পেইজে বা হেল্পলাইন নাম্বারে জানাতে হবে। তাহলে রিপ্লেসমেন্ট/ক্রেডিট দেওয়া হবে।<br />
                                    প্রোডাক্ট রিসিভ করার পরবর্তী সময়ে পানি বা পরিবেশজনিত কারণে মৃত্যুর দায় আমাদের নয়।
                                </span>
                            </div>

                            <div>
                                <p className='font-bold pb-1'>★ অ্যাকসেসরিজ প্রোডাক্ট:</p>
                                <span> ডেলিভারির সময় কুরিয়ার ডেলিভারি ম্যানের উপস্থিতিতে প্রোডাক্টের বাহ্যিক অবস্থা, কোয়ালিটি, ব্রোকেন ড্যামেজ ইত্যাদি চেক করে তবেই রিসিভ করুন।<br />
                                    একবার রিসিভ করার পর বাহ্যিক ড্যামেজ নিয়ে কোনো অভিযোগ গ্রহণযোগ্য নয়।<br />
                                    যদি প্রোডাক্টে কোনো টেকনিক্যাল ইস্যু বা মিসিং পার্ট থাকে, তাহলে ২৪ ঘণ্টার মধ্যে আমাদেরকে জানাতে হবে রিপ্লেসমেন্টের জন্য।<br />
                                    অ্যাকসেসরিজ প্রোডাক্ট রিটার্নযোগ্য নয়, তবে টেকনিক্যাল ইস্যু থাকলে রিপ্লেসমেন্ট পাবেন।</span>
                            </div>

                            <div>
                                <p className='font-bold pb-1'>★ রিপ্লেসমেন্ট নিয়মাবলী:</p>
                                <span>
                                    ঢাকার ভিতরে ৩ কার্যদিবসের মধ্যে এবং ঢাকার বাইরে ৫ কার্যদিবসের মধ্যে রিপ্লেসমেন্ট পাঠানো হবে।<br />
                                    <span className='text-sm font-semibold'>কোনো পরিস্থিতিতে মানি রিফান্ড সম্ভব নয়।</span>
                                </span>
                            </div>
                        </div>

                        <label className="flex items-start gap-2 mt-6">
                            <input
                                type="checkbox"
                                className="mt-1"
                                checked={termsChecked}
                                onChange={(e) => {
                                    setTermsChecked(e.target.checked);
                                    setFormErrors((prev) => ({ ...prev, terms: '' }));
                                }}
                            />
                            <span className="text-sm">আমি উপরের টার্মস এন্ড কন্ডিশনগুলো পড়েছি এবং সম্মত হয়েছি।</span>
                        </label>
                        {formErrors.terms && <p className="text-red-500 text-sm mt-1">{formErrors.terms}</p>}

                        <button
                            onClick={handlePlaceOrder}
                            disabled={!formValid}
                            className={`mt-4 w-full font-semibold py-3 rounded transition ${formValid
                                ? 'bg-[#01B7DB] hover:bg-[#0197c7] text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Place Order
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
