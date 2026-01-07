"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FiTrash2,
  FiPlus,
  FiLink,
  FiType,
  FiImage,
  FiVideo,
} from "react-icons/fi";

// Define the interface based on the backend model
interface Banner {
  _id: string;
  title?: string;
  link?: string;
  image?: string;
  video?: string;
  isActive: boolean;
}

export default function BannerManagement() {
  const api = process.env.NEXT_PUBLIC_API_URL as string;
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/v1/banner`);
      const result = await response.json();
      if (result.success) {
        setBanners(result.data);
      } else {
        console.error("Failed to fetch banners:", result.message);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setLink("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setMessage(null);
  };

  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select an image or video." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append(mediaType, selectedFile); // Append as 'image' or 'video'

    try {
      const response = await fetch(`${api}/api/v1/banner/create`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: "success", text: "Banner created successfully!" });
        resetForm();
        fetchBanners();
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to create banner.",
        });
      }
    } catch (error) {
      console.error("Error creating banner:", error);
      setMessage({
        type: "error",
        text: "An error occurred while creating the banner.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const response = await fetch(`${api}/api/v1/banner/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setBanners((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert(result.message || "Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("An error occurred while deleting the banner.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Banner Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiPlus className="text-blue-600" />
          Add New Banner
        </h2>

        <form onSubmit={handleCreateBanner} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiType />
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter banner title"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiLink />
                  </span>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="e.g., /products/sale"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media Type
                </label>
                <div className="flex gap-4">
                  <label
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      mediaType === "image"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mediaType"
                      value="image"
                      checked={mediaType === "image"}
                      onChange={() => setMediaType("image")}
                      className="hidden"
                    />
                    <FiImage /> Image
                  </label>
                  <label
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      mediaType === "video"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mediaType"
                      value="video"
                      checked={mediaType === "video"}
                      onChange={() => setMediaType("video")}
                      className="hidden"
                    />
                    <FiVideo /> Video
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File
                </label>
                <input
                  type="file"
                  accept={mediaType === "image" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                />
              </div>
            </div>

            {/* Right Column: Preview */}
            <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 min-h-[200px] overflow-hidden relative">
              {previewUrl ? (
                mediaType === "image" ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full max-h-[300px]"
                  />
                )
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-sm">Media Preview</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            {message && (
              <span
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message.text}
              </span>
            )}
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !selectedFile}
              className={`px-6 py-2 rounded-lg text-white font-medium shadow-sm transition-all ${
                submitting || !selectedFile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {submitting ? "Creating..." : "Create Banner"}
            </button>
          </div>
        </form>
      </div>

      {/* Banner List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Existing Banners
        </h3>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading banners...
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-500">
            No banners found. Add one above!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {banner.video ? (
                    <video
                      src={banner.video}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <Image
                      src={banner.image || "/placeholder.png"}
                      alt={banner.title || "Banner"}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Overlay for quick actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeleteBanner(banner._id)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                      title="Delete Banner"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h4
                    className="font-semibold text-gray-800 truncate"
                    title={banner.title}
                  >
                    {banner.title || "Untitled Banner"}
                  </h4>
                  {banner.link && (
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1 truncate"
                    >
                      <FiLink size={12} /> {banner.link}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
