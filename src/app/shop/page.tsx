'use client';

import React, { useState } from 'react';
import { products } from '../static data/products';
import ProductCard from '../components/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faList } from '@fortawesome/free-solid-svg-icons';

// If you're using Redux to store cart data:
import { useSelector } from 'react-redux';

const ShopPage = () => {
    const [sortOption, setSortOption] = useState('latest');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([100, 2500]); // Extended max to match data
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);

    // Access cart data from Redux store (if using Redux)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cart = useSelector((state: any) => state.cart.items);  // Adjust based on your Redux store structure

    const categories = ['Crowntail Fish', 'Half Moon Fish', 'Plakat Fish'];
    const productsPerPage = 12;

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // reset to page 1 on sort
    };

    // Handle category toggle
    const handleCategoryClick = (category: string) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    // Filter products
    const filteredProducts = products.filter((product) => {
        const productPrice = parseFloat(product.price);
        const matchesCategory =
            selectedCategory.length === 0 ||
            selectedCategory.includes(product.category);
        const withinPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
        return matchesCategory && withinPrice;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (sortOption === 'priceLowHigh') return priceA - priceB;
        if (sortOption === 'priceHighLow') return priceB - priceA;
        return 0;
    });

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleClearFilters = () => {
        setSelectedCategory([]);
        setPriceRange([100, 2500]);
        setSortOption('latest');
        setCurrentPage(1);
    };

    return (
        <div className="pt-32 flex flex-col lg:flex-row px-4 lg:px-16 py-10 gap-10 bg-white">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 space-y-10">
                {/* Show cart status */}
                <div className="bg-[#f0f5fc] p-4 text-center font-semibold">
                    {cart.length === 0
                        ? 'No products in the cart.'
                        : `You have ${cart.length} product${cart.length > 1 ? 's' : ''} in your cart.`}
                </div>

                {/* Price Filter */}
                <div className="bg-[#f0f5fc] p-4">
                    <h3 className="text-[#182052] font-bold mb-4">PRICE FILTER</h3>
                    <input
                        type="range"
                        min={100}
                        max={2500}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([100, parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <p className="text-sm text-center mt-2">
                        PRICE: ${priceRange[0]} – ${priceRange[1]}
                    </p>
                </div>

                {/* Categories */}
                <div className="bg-[#f0f5fc] p-4">
                    <h3 className="text-[#182052] font-bold mb-4">CATEGORIES</h3>
                    <ul className="space-y-2">
                        {categories.map((cat, i) => (
                            <li key={i} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes(cat)}
                                    onChange={() => handleCategoryClick(cat)}
                                    id={`category-${i}`}
                                    className="mr-2"
                                />
                                <label htmlFor={`category-${i}`} className="cursor-pointer">
                                    {cat}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Clear Filters */}
                <button
                    onClick={handleClearFilters}
                    className="w-full font-semibold cursor-pointer border duration-300 border-[#01B7DB] text-[#01B7DB] px-6 py-2 rounded hover:bg-[#01B7DB] hover:text-white"
                >
                    Clear Filters
                </button>
            </aside>

            {/* Main Content */}
            <main className="w-full lg:w-3/4">
                {/* Sort Dropdown */}
                <div className="flex justify-end mb-6">
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="border border-gray-300 px-4 py-2 rounded bg-[#f0f5fc] text-[#182052]"
                    >
                        <option value="latest">Sort by latest</option>
                        <option value="priceLowHigh">Sort by price: low to high</option>
                        <option value="priceHighLow">Sort by price: high to low</option>
                    </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex justify-end mb-6 gap-3">
                    <button
                        className={`p-2 text-3xl duration-300 ${viewMode === 'grid' ? 'text-[#01B7DB]' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <FontAwesomeIcon icon={faGripVertical} />
                    </button>
                    <button
                        className={`p-2 text-3xl duration-300 ${viewMode === 'list' ? 'text-[#01B7DB]' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <FontAwesomeIcon icon={faList} className='' />
                    </button>
                </div>

                {/* Products Display */}
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products found.</p>
                    )}
                </div>

                {/* Pagination */}
                {sortedProducts.length > productsPerPage && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-2 bg-[#01B7DB] text-white rounded"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">{currentPage}</span>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(sortedProducts.length / productsPerPage))
                                )
                            }
                            disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
                            className="px-4 py-2 mx-2 bg-[#01B7DB] text-white rounded"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ShopPage;
