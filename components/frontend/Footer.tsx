import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram,  FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-black text-white pt-6 md:pt-10">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="space-y-4">
            <Image
              src="/logo2.JPG"
              alt="logo"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
            />
            <p className="text-base sm:text-lg leading-relaxed">
              1.Business Address: Texas 3,Webster,TX,77598 ,USA
            </p>
            <p className="text-sm sm:text-base">
              Company Registration Number: ‪+1 -832-788-6738‬
            </p>
            <p className="text-sm sm:text-base">
              VAT Registration Number: ‪+1 -832-788-6738‬
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Categories</h3>
            <ul className="space-y-2 text-base sm:text-lg">
              
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-300 transition-colors block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/t-shirts"
                  className="hover:text-gray-300 transition-colors block"
                >
                  T-Shirts
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Information</h3>
            <ul className="space-y-2 text-base sm:text-lg">
              <li>
                <Link
                  href="/shipping-delivery"
                  className="hover:text-gray-300 transition-colors block"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-gray-300 transition-colors block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-300 transition-colors block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-gray-300 transition-colors block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-gray-300 transition-colors block"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-gray-300 transition-colors block"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold">Get In Touch</h3>
              <ul className="space-y-3 text-base sm:text-lg">
                <li>
                  <Link
                    href="mailto:info@smart-wears.com"
                    className="hover:text-gray-300 transition-colors flex items-start gap-2"
                  >
                    <span>📧</span>
                    <span>info@smart-wears.com</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+441438353822"
                    className="hover:text-gray-300 transition-colors flex items-start gap-2"
                  >
                    <span>📞</span>
                    Contact phone: Admin Mr Nohel ‪+1 -832-788-6738‬
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+441438353822"
                    className="hover:text-gray-300 transition-colors flex items-start gap-2"
                  >
                    <span>📞</span>
                    <span>‪+1 -832-788-6738‬</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href="https://www.facebook.com/smartwearoutfits"
                    target="_blank"
                    className="hover:text-blue-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook
                      size={24}
                      className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/smartwearoutfits"
                    target="_blank"
                    className="hover:text-pink-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram
                      size={24}
                      className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.twitter.com/smartwearoutfits"
                    target="_blank"
                    className="hover:text-blue-300 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaXTwitter
                      size={24}
                      className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/smartwearoutfits"
                    target="_blank"
                    className="hover:text-blue-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaTiktok
                      size={24}
                      className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} Smart-wears. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
