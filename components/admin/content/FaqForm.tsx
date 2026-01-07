"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";
import { FaPlus, FaTrash } from "react-icons/fa";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: string;
}

interface Props {
  initialData: FaqItem[];
  slug: string;
}

const FaqForm: React.FC<Props> = ({ initialData, slug }) => {
  const [items, setItems] = useState<FaqItem[]>(initialData || []);
  const [saving, setSaving] = useState(false);

  const handleChange = (index: number, field: keyof FaqItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      { id: newId, question: "New Question", answer: "New Answer", icon: "❓" },
    ]);
  };

  const removeItem = (index: number) => {
    if (window.confirm("Are you sure you want to delete this FAQ item?")) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateContent(slug, items);
    setSaving(false);

    if (result.success) {
      toast.success("FAQ updated successfully!");
    } else {
      toast.error(result.message || "Failed to update FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-purple-50 border border-purple-200 p-4 rounded-lg">
        <p className="text-purple-800 text-sm">
          <strong>Manage FAQ:</strong> Add, remove, and edit questions.
        </p>
        <button
          onClick={addItem}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 flex items-center gap-2"
        >
          <FaPlus /> Add Question
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl bg-gray-50 p-2 rounded">
                {item.icon}
              </span>
              <span className="text-gray-400 text-sm">ID: {item.id}</span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete Question"
            >
              <FaTrash />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={item.question}
                onChange={(e) =>
                  handleChange(index, "question", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={item.answer}
                onChange={(e) => handleChange(index, "answer", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Emoji
              </label>
              <input
                type="text"
                value={item.icon}
                onChange={(e) => handleChange(index, "icon", e.target.value)}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save FAQ"}
        </button>
      </div>
    </div>
  );
};

export default FaqForm;
