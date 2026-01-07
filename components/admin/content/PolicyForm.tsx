"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";
import { FaPlus, FaTrash } from "react-icons/fa";

interface PolicySection {
  id: string | number;
  title: string;
  icon?: string;
  content: string;
  list?: string[];
  process?: {
    title: string;
    steps: string[];
  };
  note?: string;
  warning?: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

interface Props {
  initialData: PolicySection[];
  slug: string;
}

const PolicyForm: React.FC<Props> = ({ initialData, slug }) => {
  const [sections, setSections] = useState<PolicySection[]>(initialData || []);
  const [saving, setSaving] = useState(false);

  const handleSectionChange = (
    index: number,
    field: keyof PolicySection,
    value: any
  ) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleListChange = (
    sectionIndex: number,
    listIndex: number,
    value: string
  ) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].list) {
      newSections[sectionIndex].list![listIndex] = value;
      setSections(newSections);
    }
  };

  const addListItem = (sectionIndex: number) => {
    const newSections = [...sections];
    if (!newSections[sectionIndex].list) newSections[sectionIndex].list = [];
    newSections[sectionIndex].list!.push("");
    setSections(newSections);
  };

  const removeListItem = (sectionIndex: number, listIndex: number) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].list) {
      newSections[sectionIndex].list!.splice(listIndex, 1);
      setSections(newSections);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateContent(slug, sections);
    setSaving(false);

    if (result.success) {
      toast.success("Policy updated successfully!");
    } else {
      toast.error(result.message || "Failed to update policy");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <p className="text-orange-800 text-sm">
          <strong>Edit Policy:</strong> Modify sections, lists, and specific
          notes. Icons are fixed.
        </p>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative"
        >
          <div className="absolute top-4 right-4 bg-gray-100 text-xs px-2 py-1 rounded">
            ID: {section.id}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{section.icon}</span>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase">
                Section Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                className="w-full font-bold text-lg border-b border-gray-300 focus:border-blue-500 outline-none py-1 bg-transparent"
              />
            </div>
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
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* List Items Editing */}
            {section.list && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bullet Points
                </label>
                <div className="space-y-2">
                  {section.list.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleListChange(index, i, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <button
                        onClick={() => removeListItem(index, i)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addListItem(index)}
                  className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <FaPlus size={12} /> Add Point
                </button>
              </div>
            )}

            {/* Note & Warning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.note !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">
                    Note (Optional)
                  </label>
                  <textarea
                    value={section.note}
                    onChange={(e) =>
                      handleSectionChange(index, "note", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-blue-100 bg-blue-50 rounded-lg text-sm"
                  />
                </div>
              )}
              {section.warning !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Warning (Optional)
                  </label>
                  <textarea
                    value={section.warning}
                    onChange={(e) =>
                      handleSectionChange(index, "warning", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-red-100 bg-red-50 rounded-lg text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold shadow-lg hover:bg-orange-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Policy"}
        </button>
      </div>
    </div>
  );
};

export default PolicyForm;
