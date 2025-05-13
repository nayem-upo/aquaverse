'use client';

import React, { useState } from 'react';
import { products } from '../static data/products';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
    const [sortOption, setSortOption] = useState('latest');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([2, 23]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);

    const categories = ['Crowntail Fish', 'Flower Tail Fish', 'Half Moon Fish', 'Plakat Fish'];
    const productsPerPage = 12;

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    // Handle category toggle
    const handleCategoryClick = (category: string) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    // Filter products based on category and price range
    const filteredProducts = products.filter((product) => {
        const productPrice = parseFloat(product.price.replace('$', '').split('–')[0]);
        const matchesCategory =
            selectedCategory.length === 0 ||
            selectedCategory.some((category) => product.category.toLowerCase().includes(category.toLowerCase())); // Use product.category instead of product.name
        const withinPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
        return matchesCategory && withinPrice;
    });


    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getPrice = (price: string) => parseFloat(price.replace('$', '').split('–')[0]);
        const priceA = getPrice(a.price);
        const priceB = getPrice(b.price);

        if (sortOption === 'priceLowHigh') return priceA - priceB;
        if (sortOption === 'priceHighLow') return priceB - priceA;
        return 0; // Default sorting for 'latest'
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle Clear Filters
    const handleClearFilters = () => {
        setSelectedCategory([]);
        setPriceRange([2, 23]);
        setSortOption('latest');
        setCurrentPage(1);
    };

    return (
        <div className="pt-32 flex flex-col lg:flex-row px-4 lg:px-16 py-10 gap-10 bg-white">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 space-y-10">
                {/* Cart Info */}
                <div className="bg-[#f0f5fc] p-4 text-center font-semibold">No products in the cart.</div>

                {/* Price Filter */}
                <div className="bg-[#f0f5fc] p-4">
                    <h3 className="text-[#182052] font-bold mb-4">PRICE FILTER</h3>
                    <input
                        type="range"
                        min={2}
                        max={23}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([2, parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <p className="text-sm text-center mt-2">
                        PRICE: ${priceRange[0]} – ${priceRange[1]}
                    </p>
                    <button className="w-full mt-4 cursor-pointer border duration-300 hover:border-[#01B7DB]  hover:text-[#01B7DB] px-6 bg-[#01B7DB] hover:bg-white text-white font-bold py-2 rounded">FILTER</button>
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
                <div className="flex justify-end mb-6">
                    <button
                        className={`p-2 ${viewMode === 'grid' ? 'bg-[#01B7DB]' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        Grid View
                    </button>
                    <button
                        className={`p-2 ${viewMode === 'list' ? 'bg-[#01B7DB]' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        List View
                    </button>
                </div>

                {/* Product Grid/List */}
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products found.</p>
                    )}
                </div>

                {/* Pagination Controls */}
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
