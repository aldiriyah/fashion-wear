"use client";
import React from "react";

const VideoBanner = () => {
  return (
    <section className="mt-8 h-[80vh] overflow-hidden">
      <video
        className="w-full h-full object-contain" 
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
};

export default VideoBanner;