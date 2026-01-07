"use client";
import Map from "@/components/frontend/Map";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

interface ContactUsClientProps {
  contactInfo: any;
}

const api = process.env.NEXT_PUBLIC_API_URL;

const ContactUsClient: React.FC<ContactUsClientProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const defaultInfo = {
    address: "Texas 3,Webster,TX,77598 ,USA",
    phones: ["+1 -832-788-6738", "+1 -832-788-6738"],
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      tiktok: "#",
    },
    hours: {
      sunday_thursday: "9:00 AM - 6:00 PM",
      friday_saturday: "Closed",
    },
  };

  const info = contactInfo || defaultInfo;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    fetch(`${api}/api/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.success);
        if (data.success) {
          toast.success("Message sent successfully!");
        } else {
          toast.error("Error sending message. Please try again.");
        }
      });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us. We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
              Let&apos;s Talk
            </h2>

            <div className="space-y-6 md:space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-3 rounded-full shadow-md mt-1">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Our Address
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg">
                    {info.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 p-3 rounded-full shadow-md mt-1">
                  <FaPhone className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Phone Number
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg">
                    📞 {info.phones[0]}
                    <br />
                    📞 {info.phones[1]}
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={info.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href={info.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                  >
                    <FaXTwitter className="text-xl" />
                  </a>
                  <a
                    href={info.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <a
                    href={info.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-800 hover:bg-blue-900 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                  >
                    <FaTiktok className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 md:mt-12 p-4 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Hours
              </h4>
              <p className="text-gray-700 text-sm">
                Sunday - Thursday: {info.hours.sunday_thursday}
                <br />
                Friday - Saturday: {info.hours.friday_saturday}
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg border border-gray-100">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 text-lg">
              Send us a message and we&apos;ll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                We typically respond within 24 hours
              </p>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="my-16 md:my-20 lg:my-24 bg-gray-100 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Find Us Here
          </h3>
          <div className="bg-gray-300  rounded-xl h-64 md:h-80 lg:h-96 flex items-center justify-center">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsClient;
