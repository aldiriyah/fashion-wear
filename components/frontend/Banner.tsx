"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalSlides = 3;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current && index >= 0 && index < totalSlides) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      scrollToSlide((activeIndex + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-full snap-center">
            <div className="relative w-full pt-[56.25%]">
              <Image
                src={`https://picsum.photos/1920/1080?random=${index + 1}`}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center  bg-gray-100 py-4  space-x-2">
        <button
          onClick={() => scrollToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          className=" bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white disabled:opacity-50 transition"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-gray-800" />
        </button>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              index === activeIndex
                ? "bg-black text-white"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block w-2 h-2 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-gray-600"
              }`}
            ></span>
          </button>
        ))}
        <button
          onClick={() => scrollToSlide(activeIndex + 1)}
          disabled={activeIndex === totalSlides - 1}
          className=" bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white disabled:opacity-50 transition"
          aria-label="Next"
        >
          <FaChevronRight className="text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
