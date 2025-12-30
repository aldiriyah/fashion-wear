import { Browser, cookiePolicySections, CookieType, cookieTypes, PolicySections } from "@/types/constants/cookies";
import React from "react";



// Reusable Policy Section Component
const PolicySection: React.FC<{ section: PolicySections }> = ({ section }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
    <div className="border-l-4 border-amber-500">
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
            {section.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {section.id}. {section.title}
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4">
          {section.content}
        </p>

        {section.list && (
          <ul className="space-y-3 mt-4">
            {section.list.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <span className="bg-amber-100 text-amber-600 rounded-full p-1 mt-1 flex-shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {section.note && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 font-medium">💡 {section.note}</p>
          </div>
        )}

        {section.warning && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <p className="text-red-800 font-medium">⚠️ {section.warning}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Table Row Component
const TableRow: React.FC<{ cookie: CookieType; index: number }> = ({ cookie }) => (
  <tr className="hover:bg-amber-50 transition-colors duration-200">
    <td className="px-6 py-4 font-medium text-gray-800">
      {cookie.type}
    </td>
    <td className="px-6 py-4 text-gray-600">
      {cookie.purpose}
    </td>
    <td className="px-6 py-4 text-gray-600">
      {cookie.examples}
    </td>
  </tr>
);

// Browser Link Component
const BrowserLink: React.FC<{ browser: Browser; index: number }> = ({ browser, index }) => (
  <a
    key={index}
    href={browser.url}
    className="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg p-4 text-center transition-colors duration-200 group"
  >
    <div className="text-2xl mb-2">🌐</div>
    <span className="text-gray-700 font-medium group-hover:text-amber-700">
      {browser.name}
    </span>
  </a>
);

// Main Component
const CookiesPolicy: React.FC = () => {
  

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 md:py-16 lg:py-24 xl:py-28  px-4 sm:px-6 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Cookie Policy
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto border border-amber-200">
            <p className="text-lg text-gray-700 font-semibold mb-2">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains how Smart Wear uses cookies and similar technologies to recognize you 
              when you visit our website, how they work, and how you can control them. At Smart Wear, we value 
              your privacy and transparency. This policy should be read together with our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {cookiePolicySections.slice(0, 3).map((section: PolicySections) => (
            <PolicySection key={section.id} section={section} />
          ))}

          {/* Cookie Types Table Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
            <div className="border-l-4 border-amber-500">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      4. Types of Cookies We Use
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Type of Cookie</th>
                        <th className="px-6 py-4 text-left font-semibold">Purpose</th>
                        <th className="px-6 py-4 text-left font-semibold">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cookieTypes.map((cookie: CookieType, index: number) => (
                        <TableRow key={index} cookie={cookie} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Sections */}
          {cookiePolicySections.slice(3).map((section: PolicySections) => (
            <PolicySection key={section.id} section={section} />
          ))}
        </div>

        {/* Browser Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12 border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Manage Cookies in Your Browser
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cookiePolicySections[3]?.browsers?.map((browser: Browser, index: number) => (
              <BrowserLink key={index} browser={browser} index={index} />
            ))}
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Cookie Control</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            You&apos;re always in control of your cookie preferences. Use your browser settings 
            or our cookie banner to manage how cookies are used on our website.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CookiesPolicy;