"use client";
import { useState, useEffect } from "react";
import React from "react";

import { ProductType } from "@/types/ProductType";
import ProductCard from "@/components/frontend/ProductCard";

const api = process.env.NEXT_PUBLIC_API_URL;

const AllProductsSection = () => {
  const [getProducts, setGetProducts] = useState<ProductType[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}/api/v1/product`);
        const data = await response.json();
        // console.log(data);
        setGetProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const hasMoreProducts = getProducts?.length > 10;

  const displayedProducts = showAll ? getProducts : getProducts?.slice(0, 10);

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 2xl:py-24">
      <div className="container mx-auto space-y-6 px-4 sm:px-6 lg:px-0 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          All Products
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {displayedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {hasMoreProducts && (
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={handleToggleView}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProductsSection;
