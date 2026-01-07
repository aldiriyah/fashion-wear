import { fetchContent } from "@/services/contentService";
import FaqClient from "./FaqClient";
import React from "react";

const Faq = async () => {
  const dynamicContent = await fetchContent("faq");

  return <FaqClient faqItems={dynamicContent} />;
};

export default Faq;
