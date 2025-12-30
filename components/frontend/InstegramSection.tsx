"use client";
import React from "react";
import InstagramCard from "./InstagramCard";
import Link from "next/link";
import { instagramData } from "@/types/indata";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const InstegramSection = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-gray-100 px-4 lg:px-0">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-center py-4 flex-col gap-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Follow us on Instagram
          </h2>
          <p className="text-center text-gray-600">
            Stay updated with our latest collections and promotions
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-xl text-gray-800" />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto flex gap-4 pb-2 hide-scrollbar"
          >
            {instagramData.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <InstagramCard
                  image={item.image}
                  alt={item.alt}
                  link={item.link}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Next"
          >
            <FaChevronRight className="text-xl text-gray-800" />
          </button>
        </div>

        <div className="flex justify-center py-4">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
              Visit Instagram
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstegramSection;
