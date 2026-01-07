"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";
import { FaPlus, FaTrash } from "react-icons/fa";
import PolicyForm from "./PolicyForm";

// Helper type for the main structure
interface CookieStructure {
  sections: any[];
  cookieTypes: any[];
}

interface Props {
  initialData: CookieStructure;
  slug: string;
}

const CookiePolicyForm: React.FC<Props> = ({ initialData, slug }) => {
  // Need to manage sections using PolicyForm logic BUT also cookieTypes
  // Since PolicyForm expects an array of sections, we can reuse it for the 'sections' part,
  // but we need to intercept the save or manage the top level object differently.

  // Actually, PolicyForm is tied to updates for the WHOLE content.
  // I should create a specific form for Cookies that wraps two parts:
  // 1. Sections (using specific logic or reusing component if generic enough)
  // 2. Cookie Types Table

  // Or I manually implement both here to keep it clean.

  const [sections, setSections] = useState<any[]>(initialData.sections || []);
  const [cookieTypes, setCookieTypes] = useState<any[]>(
    initialData.cookieTypes || []
  );
  const [activeTab, setActiveTab] = useState<"sections" | "types">("sections");
  const [saving, setSaving] = useState(false);

  // --- Sections Helpers (Simplified version of PolicyForm logic) ---
  const handleSectionChange = (index: number, field: string, value: any) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  // --- Cookie Types Helpers ---
  const handleTypeChange = (index: number, field: string, value: string) => {
    const newTypes = [...cookieTypes];
    newTypes[index] = { ...newTypes[index], [field]: value };
    setCookieTypes(newTypes);
  };

  const addType = () => {
    setCookieTypes([
      ...cookieTypes,
      { type: "New Cookie", purpose: "Purpose", examples: "Example" },
    ]);
  };

  const removeType = (index: number) => {
    const newTypes = [...cookieTypes];
    newTypes.splice(index, 1);
    setCookieTypes(newTypes);
  };

  const handleSave = async () => {
    setSaving(true);
    // Combine back
    const fullContent = {
      sections,
      cookieTypes,
    };
    const result = await updateContent(slug, fullContent);
    setSaving(false);

    if (result.success) {
      toast.success("Cookie Policy updated successfully!");
    } else {
      toast.error(result.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4 flex justify-between items-center">
        <p className="text-amber-800 text-sm">
          <strong>Cookie Policy Editor:</strong> Manage text sections and the
          cookie classification table.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("sections")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "sections"
                ? "bg-amber-600 text-white"
                : "bg-white text-amber-600 hover:bg-amber-100"
            }`}
          >
            Text Sections
          </button>
          <button
            onClick={() => setActiveTab("types")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "types"
                ? "bg-amber-600 text-white"
                : "bg-white text-amber-600 hover:bg-amber-100"
            }`}
          >
            Cookie Types Table
          </button>
        </div>
      </div>

      {activeTab === "sections" && (
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative"
            >
              <div className="absolute top-4 right-4 bg-gray-100 text-xs px-2 py-1 rounded">
                ID: {section.id}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="font-bold text-gray-700">{section.title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionChange(index, "content", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                {/* Simple list edit if exists */}
                {section.list && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      List Items (comma separated for simple edit)
                    </label>
                    <textarea
                      value={section.list.join(" | ")}
                      onChange={(e) =>
                        handleSectionChange(
                          index,
                          "list",
                          e.target.value.split("|").map((s: string) => s.trim())
                        )
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Separate items with " | "
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "types" && (
        <div className="space-y-4">
          <button
            onClick={addType}
            className="mb-4 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 flex items-center gap-2"
          >
            <FaPlus /> Add Cookie Type
          </button>

          {cookieTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 relative group"
            >
              <button
                onClick={() => removeType(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              >
                <FaTrash />
              </button>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Type
                </label>
                <input
                  value={type.type}
                  onChange={(e) =>
                    handleTypeChange(index, "type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Purpose
                </label>
                <textarea
                  value={type.purpose}
                  onChange={(e) =>
                    handleTypeChange(index, "purpose", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Examples
                </label>
                <input
                  value={type.examples}
                  onChange={(e) =>
                    handleTypeChange(index, "examples", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Policy"}
        </button>
      </div>
    </div>
  );
};

export default CookiePolicyForm;
