import { fetchContent } from "@/services/contentService";
import ContactUsClient from "./ContactUsClient";
import React from "react";

const ContactUs = async () => {
  const dynamicContent = await fetchContent("contact-us");

  return <ContactUsClient contactInfo={dynamicContent} />;
};

export default ContactUs;
