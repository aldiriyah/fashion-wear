import { policySections } from "@/types/constants/returnPolicy";
import React from "react";

const ReturnPolicy = () => {
 

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 md:py-16 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Return Policy
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto border border-orange-200">
            <p className="text-lg text-gray-700 font-semibold mb-2">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Smart Wear, we strive to provide a seamless shopping experience by featuring a curated 
              collection of stylish, high-quality T-shirts available through Amazon.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium text-center">
                ⚠️ Please note: We do not sell, ship, or process returns directly — all transactions 
                are completed and managed by Amazon or the respective Amazon sellers.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-bold text-gray-800 mb-2">Shop on Smart Wear</h3>
            <p className="text-gray-600 text-sm">Browse our curated T-shirt collection</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="font-bold text-gray-800 mb-2">Purchase on Amazon</h3>
            <p className="text-gray-600 text-sm">Click through to complete your order</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-bold text-gray-800 mb-2">Amazon Handles Returns</h3>
            <p className="text-gray-600 text-sm">All returns processed by Amazon</p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {policySections.map((section) => (
            <div 
              key={section.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="border-l-4 border-orange-500">
                <div className="p-6 md:p-8">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {section.id}. {section.title}
                      </h2>
                      <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {/* List Items */}
                  {section.list && (
                    <ul className="space-y-3 mt-4 mb-4">
                      {section.list.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <span className="bg-orange-100 text-orange-600 rounded-full p-1 mt-1 flex-shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Process Steps */}
                  {section.process && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-blue-800 mb-3">{section.process.title}</h4>
                      <ol className="space-y-2">
                        {section.process.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3 text-blue-700">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Note */}
                  {section.note && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-green-800 font-medium">💡 {section.note}</p>
                    </div>
                  )}

                  {/* Warning */}
                  {section.warning && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                      <p className="text-red-800 font-medium">⚠️ {section.warning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Amazon Support</h3>
            <p className="mb-4 opacity-90">
              For all order-related issues, returns, refunds, or delivery questions:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span>📞</span>
                Contact Amazon Customer Service
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                Visit Amazon Help & Customer Service
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                Use the Amazon mobile app
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Smart Wear Support</h3>
            <p className="mb-4 opacity-90">
              For issues with product links or website navigation:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span>📧</span>
                Contact us through our Contact page
              </li>
              <li className="flex items-center gap-2">
                <span>🔗</span>
                Report broken product links
              </li>
              <li className="flex items-center gap-2">
                <span>💁</span>
                Get navigation assistance
              </li>
            </ul>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center border border-orange-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Choosing Smart Wear!</h3>
          <p className="text-gray-600 leading-relaxed">
            We&apos;re committed to helping you discover amazing T-shirts while providing clear guidance 
            on the return process through our trusted partner, Amazon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;