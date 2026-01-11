import React from "react";
import Link from "next/link";
import { fetchContent } from "@/services/contentService"; // Reusing the public service for fetching initial data server-side
import ShippingForm from "@/components/admin/content/ShippingForm";
import PolicyForm from "@/components/admin/content/PolicyForm";
import FaqForm from "@/components/admin/content/FaqForm";
import CookiePolicyForm from "@/components/admin/content/CookiePolicyForm";
import ContactForm from "@/components/admin/content/ContactForm";
import AboutForm from "@/components/admin/content/AboutForm";
import AdminLayoutWithAuth from "@/components/layout/layout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const EditContentPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  // Fetch initial data
  const contentData = await fetchContent(slug);

  // We allow null contentData here so the forms can show a "new" state
  // and create the entry on first save.

  const renderForm = () => {
    switch (slug) {
      case "shipping-delivery":
        return <ShippingForm initialData={contentData} slug={slug} />;
      case "return-policy":
      case "privacy-policy":
        // Both use the same structure
        return <PolicyForm initialData={contentData} slug={slug} />;
      case "faq":
        return <FaqForm initialData={contentData} slug={slug} />;
      case "cookie-policy":
        // Handles complex objects { sections, cookieTypes }
        return <CookiePolicyForm initialData={contentData} slug={slug} />;
      case "contact-us":
        return <ContactForm initialData={contentData} slug={slug} />;
      case "about-us":
        return <AboutForm initialData={contentData} slug={slug} />;
      default:
        return <div>Unknown content type</div>;
    }
  };

  const getTitle = () => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <AdminLayoutWithAuth>
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit {getTitle()}
          </h1>
          <Link
            href="/admin/content-management"
            className="text-sm text-blue-600 hover:underline"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {renderForm()}
      </div>
    </AdminLayoutWithAuth>
  );
};

export default EditContentPage;
