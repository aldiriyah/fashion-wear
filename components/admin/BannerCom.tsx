"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { FiX } from "react-icons/fi";

interface Banner {
  _id: string;
  title: string;
  image: string[];
}

export default function BannerForm() {
  const api = process.env.NEXT_PUBLIC_API_URL as string;
  const [existingBanner, setExistingBanner] = useState<Banner | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 
  const fetchBanner = useCallback(async () => {
    try {
      const response = await fetch(`${api}/api/v1/features/find-banner`);
      if (response.ok) {
        const data = await response.json();
        setExistingBanner(data.data);
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  }, [api, ]);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };


  const handleDeleteExisting = (index: number) => {
    if (!existingBanner) return;
    const updatedImages = existingBanner.image.filter((_, i) => i !== index);
    setExistingBanner({ ...existingBanner, image: updatedImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    images.forEach((file) => formData.append("image", file));

   
    if (existingBanner?.image) {
      formData.append("existingImages", JSON.stringify(existingBanner.image));
    }

    try {
      const response = await fetch(`${api}/api/v1/features/create-banner`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to upload banner");

      setMessage(data.message);
      setImages([]);
      setPreviewUrls([]);
      fetchBanner();
    } catch (error: unknown) {
      console.error("Error uploading banner:", error);
      setMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Manage Smartwear Banner
      </h2>

      
     {(existingBanner?.image?.length ?? 0) > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Current Banner Images:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {existingBanner?.image.map((url, idx) => (
              <div key={idx} className="relative group">
                <Image
                  src={url}
                  alt={`banner-${idx}`}
                  width={120}
                  height={80}
                  className="w-full h-40 object-cover rounded-lg border"
                />
              
                <button
                  type="button"
                  onClick={() => handleDeleteExisting(idx)}
                  className="absolute top-2 right-2 bg-white/80 text-red-600 hover:text-red-700 rounded-full p-1 shadow transition-opacity opacity-0 group-hover:opacity-100"
                  title="Delete this image"
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload New Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

        
        {previewUrls.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Preview (New Uploads):</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewUrls.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  width={120}
                  height={80}
                  alt={`preview-${idx}`}
                  className="w-full h-40 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}

      
        <button
          type="submit"
          disabled={loading || (images.length === 0 && !existingBanner?.image?.length)}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Update Banner"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
