"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";

interface ShippingItem {
  id: number;
  title: string;
  icon: string;
  content: string;
}

interface Props {
  initialData: ShippingItem[]; // The array of items
  slug: string;
}

const ShippingForm: React.FC<Props> = ({ initialData, slug }) => {
  // initialData is the array directly: [ {id, title, icon, content}, ... ]
  const [items, setItems] = useState<ShippingItem[]>(initialData || []);
  const [saving, setSaving] = useState(false);

  // Handle text changes
  const handleChange = (
    index: number,
    field: keyof ShippingItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = async () => {
    setSaving(true);
    // Send the array as 'content'
    const result = await updateContent(slug, items);
    setSaving(false);

    if (result.success) {
      toast.success("Content updated successfully!");
    } else {
      toast.error(result.message || "Failed to update content");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> You can edit the title and content for each
          shipping feature. The icons are fixed to maintain design consistency.
        </p>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="bg-gray-50 p-6 rounded-xl border border-gray-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl bg-white p-2 rounded shadow-sm">
              {item.icon}
            </span>
            <h3 className="text-lg font-bold text-gray-700">
              Feature #{index + 1}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={item.content}
                onChange={(e) => handleChange(index, "content", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ShippingForm;
