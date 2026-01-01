"use client";
import { FooterData } from "@/types/FooterTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/features/get-footer`
        );
        const data = await response.json();
        if (data?.data) {
          setFooterData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <nav className="fixed top-0   left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Contact Bar */}
      <div
        className={`bg-gray-800 transition-all duration-500 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100 h-10"
            : "-translate-y-full opacity-0 h-0"
        } overflow-hidden`}
      >
        <div className="container mx-auto flex gap-2 md:gap-4 items-center justify-center h-10 text-sm">
          <div className="text-gray-400">📞 ‪+1 -832-788-6738‬</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400">📧 info@smart-wears.com</div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`bg-white transition-all  duration-500 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-2 pt-3"
        }`}
      >
        <div className="container mx-auto flex  items-center justify-between md:justify-start gap-10 text-black px-6 md:px-0 py-1">
          {/* logo */}
          <div className="flex-shrink-0">
            <Image
              src={footerData?.companyInfo.logo || ""}
              alt="logo"
              width={60}
              height={60}
              className=" transition-transform duration-300 hover:scale-105"
            />
            {/* {footerData?.title} */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="flex items-center justify-between gap-8">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-600 transition-all duration-300 ease-out py-2 border-b-2 border-transparent hover:border-gray-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-600 transition-all duration-300 ease-out py-2 border-b-2 border-transparent hover:border-gray-600"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href={"/t-shirts"}
                  className="hover:text-gray-600 transition-all duration-300 ease-out py-2 border-b-2 border-transparent hover:border-gray-600"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-gray-600 transition-all duration-300 ease-out py-2 border-b-2 border-transparent hover:border-gray-600"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-600 transition-all duration-300 ease-out py-2 border-b-2 border-transparent hover:border-gray-600"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative group"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              } group-hover:bg-gray-600`}
            ></span>
            <span
              className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              } group-hover:bg-gray-600`}
            ></span>
            <span
              className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              } group-hover:bg-gray-600`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`lg:hidden bg-white transition-all duration-500 ease-out border-t border-gray-200 ${
          isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col text-black items-center space-y-3">
          <li className="w-full text-center">
            <Link
              href="/"
              className="block py-3 px-4 hover:text-gray-600 transition-all duration-300 ease-out hover:bg-gray-50 rounded-lg mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href="/products"
              className="block py-3 px-4 hover:text-gray-600 transition-all duration-300 ease-out hover:bg-gray-50 rounded-lg mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href={"/t-shirts"}
              className="block py-3 px-4 hover:text-gray-600 transition-all duration-300 ease-out hover:bg-gray-50 rounded-lg mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              T-Shirts
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href="/contact"
              className="block py-3 px-4 hover:text-gray-600 transition-all duration-300 ease-out hover:bg-gray-50 rounded-lg mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="w-full text-center">
            <Link
              href="/about"
              className="block py-3 px-4 hover:text-gray-600 transition-all duration-300 ease-out hover:bg-gray-50 rounded-lg mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
