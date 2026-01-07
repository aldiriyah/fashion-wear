import InstegramSection from "@/components/frontend/InstegramSection";
import ProductSection from "@/components/frontend/ProductSection";
import Banner from "@/components/frontend/Banner";
import React from "react";

export default function Home() {
  return (
    <div className="h-auto bg-white">
      <Banner />

      <div className="bg-gray-50 py-12">
        <ProductSection />
      </div>

      <InstegramSection />
    </div>
  );
}
