"use client";

import BannerPage from "@/components/admin/BannerCom";
import FooterForm from "@/components/admin/Footer";
import NavbarManager from "@/components/admin/NavbarManager";
import AdminLayoutWithAuth from "@/components/layout/layout";
import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "footer", label: "Footer" },
    { id: "banner", label: "Banner Management" },
    { id: "navbar", label: "Navbar Management" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <AdminLayoutWithAuth>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "footer" && (
            <div>
              <FooterForm />
            </div>
          )}

          {activeTab === "banner" && (
            <div>
              <BannerPage />
            </div>
          )}

          {activeTab === "navbar" && (
            <div>
              <NavbarManager />
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Profile Settings
              </h2>
              <p className="text-gray-600">
                Update your personal information and preferences.
              </p>
              {/* Add your profile settings content here */}
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Security Settings
              </h2>
              <p className="text-gray-600">
                Manage your password and security preferences.
              </p>
              {/* Add your security settings content here */}
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Notification Settings
              </h2>
              <p className="text-gray-600">
                Configure how you receive notifications.
              </p>
              {/* Add your notification settings content here */}
            </div>
          )}
        </div>
      </div>
    </AdminLayoutWithAuth>
  );
};

export default Settings;
