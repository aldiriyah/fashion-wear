"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface BannerData {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
}

const Banner = () => {
  const api = process.env.NEXT_PUBLIC_API_URL as string;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${api}/api/v1/banner`);
        const data = await res.json();
        if (data.success && data.data) {
          setBanners(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [api]);

  const totalSlides = banners.length;

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
    if (totalSlides === 0) return;
    const timer = setInterval(() => {
      scrollToSlide((activeIndex + 1) % totalSlides);
    }, 5000); // 5 seconds auto-scroll
    return () => clearInterval(timer);
  }, [activeIndex, totalSlides]);

  if (loading)
    return <div className="w-full h-[80vh] bg-gray-200 animate-pulse" />;
  if (banners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner._id || index}
            className="flex-shrink-0 w-full h-[80vh] snap-center relative"
          >
            {/* Wrap content in Link if banner.link exists */}
            {banner.link ? (
              <a
                href={banner.link}
                className="block w-full h-full relative"
                target={banner.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <BannerContent banner={banner} index={index} />
              </a>
            ) : (
              <div className="w-full h-full relative">
                <BannerContent banner={banner} index={index} />
              </div>
            )}
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white disabled:opacity-50 transition"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-gray-800" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex === totalSlides - 1}
              className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white disabled:opacity-50 transition"
              aria-label="Next"
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Helper component for content to avoid duplication
const BannerContent = ({
  banner,
  index,
}: {
  banner: BannerData;
  index: number;
}) => (
  <>
    {banner.video ? (
      <video
        className="w-full h-full object-cover"
        src={banner.video}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <Image
        src={banner.image || "/placeholder.jpg"}
        alt={banner.title || `Banner ${index + 1}`}
        fill
        className="object-cover"
        priority={index === 0}
      />
    )}

    {/* Optional Overlay Title/Content */}
    {banner.title && (
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
        <h2 className="text-white text-4xl font-bold bg-black/30 px-4 py-2 rounded">
          {banner.title}
        </h2>
      </div>
    )}
  </>
);

export default Banner;

