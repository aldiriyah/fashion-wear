import { policySections as staticPolicySections } from "@/types/constants/privacy";
import { fetchContent } from "@/services/contentService";
import React from "react";

const PrivacyPolicy = async () => {
  const dynamicContent = await fetchContent("privacy-policy");
  const policySections = dynamicContent || staticPolicySections;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-16 lg:py-24 xl:py-28  px-4 sm:px-6 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 font-semibold">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2 leading-relaxed">
              At Smart Wear, your privacy is extremely important to us. We are
              committed to protecting your personal information and being
              transparent about how we handle it.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <p className="text-gray-700 leading-relaxed text-lg">
            This Privacy Policy explains how we collect, use, store, and
            safeguard your data when you visit our website, interact with our
            content, or use any of our services. By visiting or using Smart
            Wear, you agree to the practices described in this policy. If you do
            not agree, please refrain from using our website.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {policySections.map((section: any) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="border-l-4 border-blue-500">
                <div className="p-6 md:p-8">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl flex-shrink-0">{section.icon}</div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {section.id}. {section.title}
                    </h2>
                  </div>

                  {/* Main Content */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="space-y-4 mt-6">
                      {section.subsections.map(
                        (subsection: any, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <h3 className="font-semibold text-gray-800 mb-2">
                              {subsection.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {subsection.content}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* List Items */}
                  {section.list && (
                    <ul className="space-y-2 mt-4">
                      {section.list.map((item: any, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <span className="text-blue-500 mt-1">•</span>
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

        {/* Footer Note */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
          <p className="text-lg opacity-90">
            We are committed to protecting your personal information and being
            transparent about our practices. If you have any questions,
            don&apos;t hesitate to reach out.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
