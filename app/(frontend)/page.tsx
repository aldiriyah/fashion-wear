
import InstegramSection from "@/components/frontend/InstegramSection";
import ProductSection from "@/components/frontend/ProductSection";
import VideoBanner from "@/components/frontend/VideoBanner";
import React from "react";

export default function Home() {
  return (
    <div className="h-auto bg-white">
    
      <VideoBanner />



      <div className="bg-gray-50 py-12">
        <ProductSection />
      </div>

      <InstegramSection />
    </div>
  );
}
