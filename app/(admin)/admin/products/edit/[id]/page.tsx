"use client";

import AdminLayoutWithAuth from "@/components/layout/layout";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  FaEdit, 
  FaDollarSign, 
  FaLink, 
  FaPercentage, 
  FaUpload, 
  FaSpinner,
  FaSave,
  FaBox,
  FaFileAlt,
  FaImage
} from "react-icons/fa";
import { useParams } from "next/navigation";

const api = process.env.NEXT_PUBLIC_API_URL;



export default function EditProductPage() {
    const { id } = useParams<{ id: string }>(); 
  const [formData, setFormData] = useState<ProductType>({
    _id: "",
    title: "",
    image: "",
    price: 0,
    description: "",
    discount: 0,
    link: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageError, setImageError] = useState("");

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${api}/api/v1/product/${id}`);
        const result = await res.json();

        if (result.success) {
          setFormData(result.data);
          setCurrentImage(result.data.image);
        } else {
          toast.error("Failed to fetch product data");
        }
      } catch (error: unknown) {
        toast.error("Error fetching product data: " + (error instanceof Error ? error.message : "Unknown error"));
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      if (!file.type.startsWith('image/')) {
        setImageError("Please select a valid image file (JPG, PNG, WEBP)");
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
    
    if (!formData.title || !formData.price || !formData.description || !formData.link) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof ProductType];
      if (value !== undefined && value !== null && key !== 'image') {
        data.append(key, value.toString());
      }
    });
    
    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);
      const res = await fetch(`${api}/api/v1/product/${id}`, {
        method: "PUT",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Product updated successfully!");
        // Update current image if a new one was uploaded
        if (image) {
          setCurrentImage(URL.createObjectURL(image));
        }
      } else {
        toast.error(result.message || "Failed to update product. Please try again.");
      }
    } catch (error: unknown) {
      toast.error("An error occurred while updating product: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageError("");
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  if (fetching) {
    return (
      <AdminLayoutWithAuth>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading product data...</p>
          </div>
        </div>
      </AdminLayoutWithAuth>
    );
  }

  return (
    <AdminLayoutWithAuth>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
              <FaEdit className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Product
            </h1>
            <p className="text-gray-600">
              Update the product information below
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FaBox className="w-4 h-4 mr-2" />
                    Product Title *
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
                      Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaDollarSign className="w-3 h-3" />
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
                      <FaPercentage className="w-4 h-4 mr-2" />
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
                    Description *
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
                    Product Link *
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

                {/* Image Upload Section */}
                <div className="space-y-4">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FaImage className="w-4 h-4 mr-2" />
                    Product Image
                  </label>
                  
                  {/* Current Image Preview */}
                  {currentImage && !image && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 font-medium">Current Image:</p>
                      <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={currentImage}
                            alt="Current product"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-600 flex-1">
                          This is the current product image
                        </span>
                      </div>
                    </div>
                  )}

                  {/* New Image Preview */}
                  {image && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 font-medium">New Image Preview:</p>
                      <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-green-200 bg-green-50 rounded-xl">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt="New preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-green-600 font-medium">
                            New image selected ✓
                          </span>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50">
                    <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">
                      {image ? "Change image" : "Upload new product image (optional)"}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports JPG, PNG, WEBP • Max 5MB
                    </p>
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full max-w-xs mx-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    
                    {imageError && (
                      <p className="text-red-500 text-sm mt-3">{imageError}</p>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Leave empty to keep the current image
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <FaSave className="w-4 h-4" />
                        <span>Update Product</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Fields marked with * are required
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutWithAuth>
  );
}