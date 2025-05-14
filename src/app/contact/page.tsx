"use client";

import { faMailBulk, faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactPage() {
    return (
        <section className="min-h-screen bg-white flex flex-col items-center pt-32 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-lg text-[#01B7DB] font-semibold uppercase">Get in Touch</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">Contact Us</h2>
                <div className="h-1 w-20 mx-auto bg-[#01B7DB] rounded-full mt-4"></div>
            </div>

            {/* Contact Form */}
            <div className="w-full max-w-5xl bg-[#f9f9f9] p-10 rounded-lg shadow-lg">
                <form className="grid md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-4 rounded border border-gray-300 focus:outline-[#01B7DB] w-full"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-4 rounded border border-gray-300 focus:outline-[#01B7DB] w-full"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={8}
                        className="md:col-span-2 p-4 rounded border border-gray-300 focus:outline-[#01B7DB] w-full"
                    />
                    <button
                        type="submit"
                        className="md:col-span-2 bg-[#01B7DB] hover:bg-[#0197c7] text-white py-4 font-bold text-lg rounded transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Contact Info & Map */}
            <div className="w-full mt-20 grid md:grid-cols-3 gap-8 max-w-5xl">
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faMailBulk} className="text-[#01B7DB] text-4xl" />
                    <div>
                        <h4 className="font-semibold text-gray-800">Email</h4>
                        <p className="text-gray-600">aquaversebd@gmail.com</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faMapPin} className="text-[#01B7DB] text-4xl" />
                    <div>
                        <h4 className="font-semibold text-gray-800">Address</h4>
                        <p className="text-gray-600">Dhaka, Bangladesh</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faPhone} className="text-[#01B7DB] text-4xl" />
                    <div>
                        <h4 className="font-semibold text-gray-800">Phone</h4>
                        <p className="text-gray-600">+880 1909 318898</p>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full max-w-5xl mt-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.3710138654324!2d90.30541967538336!3d23.876459078584492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c3005691fd2b%3A0xd5474a98033dbb75!2sAqua%20Verse!5e0!3m2!1sen!2sbd!4v1747219794854!5m2!1sen!2sbd"
                    className="w-full h-96 border-0 rounded-lg shadow-md"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
}
