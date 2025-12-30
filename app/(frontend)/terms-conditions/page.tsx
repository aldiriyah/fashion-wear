import { termsSections } from "@/types/constants/termscondition";
import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 md:py-16 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto border border-green-200">
            <p className="text-lg text-gray-700 font-semibold mb-2">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Smart Wear! These Terms & Conditions outline the rules
              and guidelines for using our website. By accessing or using Smart
              Wear (the Site), you agree to comply with and be bound by these
              Terms. If you disagree with any part of these Terms, please do not
              continue to use our website.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-2xl text-red-500 flex-shrink-0">📢</div>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-red-700 leading-relaxed">
                Please read these Terms carefully, as they explain your rights
                and obligations while using our services. Your continued use of
                Smart Wear constitutes acceptance of these Terms.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {termsSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="border-l-4 border-green-500">
                <div className="p-6 md:p-8">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {section.id}. {section.title}
                      </h2>
                      <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {/* List Items */}
                  {section.list && (
                    <ul className="space-y-3 mt-4">
                      {section.list.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <span className="bg-green-100 text-green-600 rounded-full p-1 mt-1 flex-shrink-0">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Note */}
                  {section.note && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-blue-800 font-medium">
                        {section.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acceptance Footer */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-black rounded-2xl p-8 mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Acceptance of Terms</h3>
            <p className="text-lg opacity-90 mb-6">
              By using Smart Wear, you acknowledge that you have read,
              understood, and agree to be bound by these Terms & Conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="font-semibold">Last Updated</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="font-semibold">Version</p>
                <p>1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
