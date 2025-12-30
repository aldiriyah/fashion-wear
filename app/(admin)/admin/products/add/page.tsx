"use client";

import AdminLayoutWithAuth from "@/components/layout/layout";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  FaUpload,
  FaDollarSign,
  FaFileAlt,
  FaLink,
  FaPercent,
  FaPlus,
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function CreateProductPage() {
  const [formData, setFormData] = useState<ProductType>({
    title: "",
    image: "",
    price: 0,
    description: "",
    discount: 0,
    link: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setImageError("Please select a valid image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        return;
      }

      setImage(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof ProductType];
      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    });
    data.append("image", image);

    try {
      setLoading(true);
      const res = await fetch(`${api}/api/v1/product/create`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setFormData({
          title: "",
          image: "",
          price: 0,
          description: "",
          discount: 0,
          link: "",
        });
        setImage(null);
        setImageError("");
        // Reset file input
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayoutWithAuth>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
              <GoPackage className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Product
            </h1>
            <p className="text-gray-600">
              Fill in the details below to add a new product to your store
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <GoPackage className="w-4 h-4 mr-2" />
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Price and Discount Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FaDollarSign className="w-4 h-4 mr-2" />
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Discount */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FaPercent className="w-4 h-4 mr-2" />
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FaFileAlt className="w-4 h-4 mr-2" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                    rows={4}
                  />
                </div>

                {/* Product Link */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FaLink className="w-4 h-4 mr-2" />
                    Product Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://example.com/product"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FaUpload className="w-4 h-4 mr-2" />
                    Product Image
                  </label>

                  {/* Image Preview */}
                  {image && (
                    <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-green-200 bg-green-50 rounded-xl">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        Image selected ✓
                      </span>
                    </div>
                  )}

                  {/* Upload Area */}
                  {!image && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50">
                      <FaUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop an image or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, WEBP • Max 5MB
                      </p>
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />

                  {imageError && (
                    <p className="text-red-500 text-sm mt-2">{imageError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Product...</span>
                    </>
                  ) : (
                    <>
                      <FaPlus className="w-5 h-5" />
                      <span>Create Product</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              All fields are required except discount
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutWithAuth>
  );
}
