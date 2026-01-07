import { shippingInfo as staticShippingInfo } from "@/types/constants/shippingData";
import { fetchContent } from "@/services/contentService";
import React from "react";

interface ShippingItem {
  id: number | string;
  title: string;
  icon: React.ReactNode;
  content: string;
}

const ShippingDelivery = async () => {
  const dynamicContent = await fetchContent("shipping-delivery");
  const data = dynamicContent || staticShippingInfo;

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 md:py-16 lg:py-24 xl:py-36  px-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Shipping & Delivery
          </h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Smart Wear, we aim to make your shopping experience smooth,
              transparent, and hassle-free. We showcase a curated selection of
              stylish and comfortable T-shirts available through Amazon, one of
              the world&apos;s most trusted online marketplaces.
            </p>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-lg">
              <div className="text-2xl flex-shrink-0">ℹ️</div>
              <div className="text-amber-800">
                <strong className="font-semibold">Important Note:</strong> Smart
                Wear does not handle product sales, shipping, or delivery
                directly. All purchases, shipping, and logistics are managed by
                Amazon or the individual sellers operating on Amazon.
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {data.map((item: ShippingItem) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden group"
            >
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Quick Summary */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-center mb-6">
              Quick Summary
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">🛒</span>
                Browse products on Smart Wear
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">🔗</span>
                Click through to Amazon to purchase
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">📦</span>
                Amazon handles all shipping & delivery
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">📱</span>
                Track your order via Amazon account
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">🆓</span>
                Prime members get free shipping on eligible items
              </li>
              <li className="flex items-center gap-3 text-lg">
                <span className="text-xl">🌍</span>
                International shipping available
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingDelivery;
