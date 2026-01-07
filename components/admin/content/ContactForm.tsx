"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";

interface ContactInfo {
  address: string;
  phones: string[];
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    tiktok: string;
  };
  hours: {
    sunday_thursday: string;
    friday_saturday: string;
  };
}

interface Props {
  initialData: ContactInfo;
  slug: string;
}

const ContactForm: React.FC<Props> = ({ initialData, slug }) => {
  const [data, setData] = useState<ContactInfo>(initialData);
  const [saving, setSaving] = useState(false);

  // Simplified handler for nested updates
  const updateField = (path: string[], value: string) => {
    const newData = { ...data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: Record<string, any> = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setData(newData);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...data.phones];
    newPhones[index] = value;
    setData({ ...data, phones: newPhones });
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateContent(slug, data);
    setSaving(false);

    if (result.success) {
      toast.success("Contact info updated successfully!");
    } else {
      toast.error(result.message || "Failed to update contact info");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
        <p className="text-green-800 text-sm">
          <strong>Contact Details:</strong> Update your business address, phone
          numbers, hours, and social media links.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
          General Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={data.address}
            onChange={(e) => updateField(["address"], e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone 1
            </label>
            <input
              type="text"
              value={data.phones[0]}
              onChange={(e) => handlePhoneChange(0, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone 2
            </label>
            <input
              type="text"
              value={data.phones[1]}
              onChange={(e) => handlePhoneChange(1, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="text"
              value={data.socials.facebook}
              onChange={(e) =>
                updateField(["socials", "facebook"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter (X)
            </label>
            <input
              type="text"
              value={data.socials.twitter}
              onChange={(e) =>
                updateField(["socials", "twitter"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="text"
              value={data.socials.instagram}
              onChange={(e) =>
                updateField(["socials", "instagram"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TikTok
            </label>
            <input
              type="text"
              value={data.socials.tiktok}
              onChange={(e) =>
                updateField(["socials", "tiktok"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
          Business Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sunday - Thursday
            </label>
            <input
              type="text"
              value={data.hours.sunday_thursday}
              onChange={(e) =>
                updateField(["hours", "sunday_thursday"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Friday - Saturday
            </label>
            <input
              type="text"
              value={data.hours.friday_saturday}
              onChange={(e) =>
                updateField(["hours", "friday_saturday"], e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Contact Info"}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
