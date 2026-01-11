"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateContent } from "@/services/adminContentService";
import { FaPlus, FaTrash } from "react-icons/fa";

interface AboutContent {
  title: string;
  heading: string;
  paragraphs: string[];
}

interface Props {
  initialData: AboutContent | null;
  slug: string;
}

const AboutForm: React.FC<Props> = ({ initialData, slug }) => {
  const [data, setData] = useState<AboutContent>(
    initialData || {
      title: "About Us",
      heading: "",
      paragraphs: [""],
    }
  );
  const [saving, setSaving] = useState(false);

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    setData({ ...data, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    setData({ ...data, paragraphs: [...data.paragraphs, ""] });
  };

  const removeParagraph = (index: number) => {
    if (data.paragraphs.length <= 1) {
      toast.warning("You must have at least one paragraph.");
      return;
    }
    const newParagraphs = data.paragraphs.filter((_, i) => i !== index);
    setData({ ...data, paragraphs: newParagraphs });
  };

  const handleSave = async () => {
    if (!data.title || !data.heading) {
      toast.error("Please fill in the title and heading.");
      return;
    }

    setSaving(true);
    const result = await updateContent(slug, data);
    setSaving(false);

    if (result.success) {
      toast.success("About Us content updated successfully!");
    } else {
      toast.error(result.message || "Failed to update content");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
        <strong>Manage About Us:</strong> Update the main title, heading, and
        the story of your brand.
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Page Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full font-bold text-lg border-b border-gray-300 focus:border-blue-500 outline-none py-1 bg-transparent"
            placeholder="e.g., About Us"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Main Heading
          </label>
          <input
            type="text"
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className="w-full font-semibold text-xl border-b border-gray-300 focus:border-blue-500 outline-none py-1 bg-transparent"
            placeholder="e.g., Smart-Wears: Elevating Bangladeshi Garments..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-500 uppercase">
            Story Paragraphs
          </label>
          {data.paragraphs.map((para, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <textarea
                  value={para}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder={`Paragraph ${index + 1}`}
                />
              </div>
              <button
                onClick={() => removeParagraph(index)}
                className="self-start mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove paragraph"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addParagraph}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-300"
          >
            <FaPlus size={12} /> Add Paragraph
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-10 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all ${
            saving ? "opacity-50 cursor-not-allowed" : "active:scale-95"
          }`}
        >
          {saving ? "Saving..." : "Update About Us"}
        </button>
      </div>
    </div>
  );
};

export default AboutForm;
