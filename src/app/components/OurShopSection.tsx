import Image from 'next/image';
import React from 'react';
import ProductSlider from './ProductSlider';

const OurShopSection = () => {
    return (
        <div className='bg-[#E9F2FF] py-24 '>
            <div className='flex justify-center mx-32 gap-14'>
                <Image
                    src="https://aqualots.themerex.net/wp-content/uploads/2017/10/image-41-copyright.jpg"
                    alt="Aqua Verse Logo"
                    className='cursor-pointer'
                    width={800}
                    height={100}
                />
                <div className='text-center flex flex-col gap-10 md:mt-20'>
                    <h2 className='text-[#EFC131] font-semibold text-xl'>Our Shop</h2>
                    <h1 className='text-6xl font-semibold text-[#182052]'>Aquatic Pets</h1>
                    <p className='text-[#1f2969]'>Hundreds of freshwater and saltwater fish available. Wide selection of aquatic plants, vines, and corals. Fish food, supplements, medication, and other aquarium supplies.</p>
                </div>
            </div>
            <div className='-mt-32'>
                <ProductSlider />
            </div>
        </div>
    );
};

export default OurShopSection;