"use client";
import React, { useState } from "react";
import { faqItems as staticFaqItems } from "@/types/constants/faq";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

interface FaqClientProps {
  faqItems: FaqItem[];
}

const FaqClient: React.FC<FaqClientProps> = ({ faqItems: propFaqItems }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqItems = propFaqItems || staticFaqItems;

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br  py-12 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about shopping with Smart
            Wear
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item: FaqItem) => (
            <div
              id={`faq-item-${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-left">
                      {item.question}
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${
                      openItems.has(item.id) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openItems.has(item.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="mb-6 opacity-90">
              Can&apos;t find the answer you&apos;re looking for? We&apos;re
              here to help!
            </p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Support
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="space-y-3">
              <a
                href="#faq-item-1"
                className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <span>📦</span>
                Shipping & Delivery Info
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <span>🔒</span>
                Privacy Policy
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <span>📄</span>
                Terms & Conditions
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <span>🔄</span>
                Return Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Shop?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse our curated collection of stylish T-shirts and discover
              your next favorite outfit today!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1">
              Start Shopping Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqClient;
