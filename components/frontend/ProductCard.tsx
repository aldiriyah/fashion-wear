import Image from "next/image";
import React from "react";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";
import { FaDollarSign } from "react-icons/fa";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log(product.link);
  return (
    <div className="bg-white relative rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs mx-auto border border-gray-100 hover:border-gray-200">
      {/* Product Image */}
      <div className="h-40 sm:h-48 bg-gray-50 flex items-center justify-center p-4 relative">
        <div className="absolute bottom-2 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          Sale
        </div>
        <Image
          src={product.image || "/placeholder-image.jpg"}
          alt={product.title}
          width={200}
          height={150}
          className="object-contain h-32 sm:h-36"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Product Title */}
        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-base sm:text-lg font-bold text-gray-900 flex items-center">
            <FaDollarSign />
            {product.price}
          </span>

          <span className="text-sm sm:text-base text-gray-500 line-through">
            %{product.discount}
          </span>
        </div>

        {/* Choose Options Button */}
        <Link
          href={`/payment?productId=${product._id}&price=${
            product.price
          }&title=${encodeURIComponent(
            product.title
          )}&image=${encodeURIComponent(product.image || "")}`}
        >
          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2 sm:py-3 px-4 rounded-md transition-colors duration-200 border border-gray-200 text-sm sm:text-base">
            Pay Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
