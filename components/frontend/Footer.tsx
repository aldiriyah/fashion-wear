"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [footerData, setFooterData] = React.useState({
    companyInfo: {
      address: "1.Business Address: Texas 3,Webster,TX,77598 ,USA",
      companyRegistrationNumber: "‪+1 -832-788-6738‬",
      vatRegistrationNumber: "‪+1 -832-788-6738‬",
      logo: "/logo2.JPG",
    },
    categories: [
      { name: "All Products", url: "/products" },
      { name: "T-Shirts", url: "/t-shirts" },
    ],
    informationLinks: [
      { title: "Shipping & Delivery", url: "/shipping-delivery" },
      { title: "FAQ", url: "/faq" },
      { title: "Privacy Policy", url: "/privacy-policy" },
      { title: "Cookie Policy", url: "/cookie-policy" },
      { title: "Terms & Conditions", url: "/terms-conditions" },
      { title: "Return Policy", url: "/return-policy" },
    ],
    contactInfo: {
      email: "info@smart-wears.com",
      phoneNumbers: [
        {
          label: "Contact phone: Admin Mr Nohel",
          number: "‪+1 -832-788-6738‬",
        },
        { label: "", number: "‪+1 -832-788-6738‬" },
      ],
    },
    socialMedia: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/smartwearoutfits",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/smartwearoutfits",
      },
      { platform: "twitter", url: "https://www.twitter.com/smartwearoutfits" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/smartwearoutfits",
      },
    ],
    copyright: `© ${new Date().getFullYear()} Smart-wears. All rights reserved.`,
  });

  React.useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/features/get-footer`
        );
        const data = await response.json();
        if (data?.data) {
          // Provide safe defaults for nested objects if the API returns partial data
          const apiData = data.data;

          setFooterData((prev) => ({
            ...prev,
            companyInfo: {
              ...prev.companyInfo,
              ...apiData.companyInfo,
              logo: apiData.companyInfo?.logo || prev.companyInfo.logo,
            },
            categories:
              apiData.categories?.length > 0
                ? apiData.categories
                : prev.categories,
            informationLinks:
              apiData.informationLinks?.length > 0
                ? apiData.informationLinks
                : prev.informationLinks,
            contactInfo: {
              ...prev.contactInfo,
              ...apiData.contactInfo,
              phoneNumbers:
                apiData.contactInfo?.phoneNumbers?.length > 0
                  ? apiData.contactInfo.phoneNumbers
                  : prev.contactInfo.phoneNumbers,
            },
            socialMedia:
              apiData.socialMedia?.length > 0
                ? apiData.socialMedia
                : prev.socialMedia,
            copyright: apiData.copyright || prev.copyright,
          }));
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div className="bg-black text-white pt-6 md:pt-10">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="space-y-4">
            <Image
              src={footerData.companyInfo.logo}
              alt="logo"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
            />
            <p className="text-base sm:text-lg leading-relaxed">
              {footerData.companyInfo.address}
            </p>
            <p className="text-sm sm:text-base">
              Company Registration Number:{" "}
              {footerData.companyInfo.companyRegistrationNumber}
            </p>
            <p className="text-sm sm:text-base">
              VAT Registration Number:{" "}
              {footerData.companyInfo.vatRegistrationNumber}
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Categories</h3>
            <ul className="space-y-2 text-base sm:text-lg">
              {footerData.categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.url}
                    className="hover:text-gray-300 transition-colors block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Information</h3>
            <ul className="space-y-2 text-base sm:text-lg">
              {footerData.informationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="hover:text-gray-300 transition-colors block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold">Get In Touch</h3>
              <ul className="space-y-3 text-base sm:text-lg">
                <li>
                  <Link
                    href={`mailto:${footerData.contactInfo.email}`}
                    className="hover:text-gray-300 transition-colors flex items-start gap-2"
                  >
                    <span>📧</span>
                    <span>{footerData.contactInfo.email}</span>
                  </Link>
                </li>
                {footerData.contactInfo.phoneNumbers.map((phone, index) => (
                  <li key={index}>
                    <Link
                      href={`tel:${phone.number}`}
                      className="hover:text-gray-300 transition-colors flex items-start gap-2"
                    >
                      <span>📞</span>
                      {phone.label
                        ? `${phone.label} ${phone.number}`
                        : phone.number}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <ul className="flex items-center gap-4">
                {footerData.socialMedia.map((social, index) => {
                  let Icon = FaFacebook;
                  if (social.platform === "instagram") Icon = FaInstagram;
                  else if (social.platform === "twitter") Icon = FaXTwitter;
                  else if (social.platform === "linkedin") Icon = FaTiktok; 

                  switch (social.platform) {
                    case "facebook":
                      Icon = FaFacebook;
                      break;
                    case "instagram":
                      Icon = FaInstagram;
                      break;
                    case "twitter":
                      Icon = FaXTwitter;
                      break;
                    case "linkedin":
                      Icon = FaTiktok;
                      break; 
                    case "youtube":
                      Icon = FaTiktok;
                      break; 
                    default:
                      Icon = FaFacebook;
                  }

                  return (
                    <li key={index}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="hover:text-blue-400 transition-colors"
                        aria-label={social.platform}
                      >
                        <Icon
                          size={24}
                          className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
