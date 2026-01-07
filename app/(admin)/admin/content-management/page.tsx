"use client";
import AdminLayoutWithAuth from "@/components/layout/layout";
import Link from "next/link";
import React from "react";
import {
  FaTruck,
  FaUndo,
  FaUserShield,
  FaQuestionCircle,
  FaCookieBite,
  FaEnvelope,
} from "react-icons/fa";

const contentTypes = [
  {
    title: "Shipping & Delivery",
    slug: "shipping-delivery",
    icon: <FaTruck className="text-4xl mb-4 text-blue-500" />,
    description: "Manage shipping icons, titles, and descriptions.",
    color: "border-blue-200 hover:border-blue-500",
  },
  {
    title: "Return Policy",
    slug: "return-policy",
    icon: <FaUndo className="text-4xl mb-4 text-orange-500" />,
    description: "Update return policy sections, processes, and warnings.",
    color: "border-orange-200 hover:border-orange-500",
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    icon: <FaUserShield className="text-4xl mb-4 text-gray-800" />,
    description: "Edit privacy policy introduction and sections.",
    color: "border-gray-200 hover:border-gray-800",
  },
  {
    title: "FAQ",
    slug: "faq",
    icon: <FaQuestionCircle className="text-4xl mb-4 text-purple-500" />,
    description: "Manage frequently asked questions and answers.",
    color: "border-purple-200 hover:border-purple-500",
  },
  {
    title: "Cookie Policy",
    slug: "cookie-policy",
    icon: <FaCookieBite className="text-4xl mb-4 text-amber-500" />,
    description: "Update cookie policy sections and types table.",
    color: "border-amber-200 hover:border-amber-500",
  },
  {
    title: "Contact Us",
    slug: "contact-us",
    icon: <FaEnvelope className="text-4xl mb-4 text-green-500" />,
    description: "Update contact details, address, social links, and hours.",
    color: "border-green-200 hover:border-green-500",
  },
];

const ContentManagement = () => {
  return (
    <AdminLayoutWithAuth>
    <div className="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Content Management
      </h1>
      <p className="text-gray-600 mb-8">
        Select a page below to edit its content. You can modify text,
        descriptions, and details. Icons and layout structure are fixed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/content-management/${item.slug}`}
            className={`bg-gray-50 rounded-xl p-8 shadow-sm border-2 ${item.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1 block`}
          >
            <div className="flex flex-col items-center text-center">
              {item.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div></AdminLayoutWithAuth>
  );
};

export default ContentManagement;
