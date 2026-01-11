import { fetchContent } from "@/services/contentService";
import React from "react";

const AboutUs = async () => {
  const content = await fetchContent("about-us");

  const defaultContent = {
    title: "About Us",
    heading: "Smart-Wears: Elevating Bangladeshi Garments to Global Standards",
    paragraphs: [
      "Smart-Wears is a rising apparel brand that exemplifies the excellence of Bangladeshi garment manufacturing. Specializing in high-quality T-shirts, the company has carved out a niche by combining premium materials, ethical production, and smart distribution. Based in Bangladesh — the world's leading producer of quality garments — Smart-Wears leverages the country's rich textile heritage and skilled labor force to deliver products that meet international standards.",
      "Bangladesh has long been recognized as a powerhouse in the global apparel industry. It ranks as the second-largest exporter of ready-made garments (RMG) globally, and is widely regarded as the number one producer of quality garments in terms of value, consistency, and ethical sourcing. The country's garment sector is built on decades of experience, robust infrastructure, and a commitment to sustainability. With over 4,000 factories and millions of skilled workers, Bangladesh supplies major global retailers like H&M, Zara, and Uniqlo — and now, Smart-Wears is joining that elite league.",
      "Smart-Wears focuses on T-shirts, a staple of casual fashion and everyday wear. What sets the brand apart is its attention to detail: from selecting soft, breathable cotton to ensuring precise stitching and vibrant, fade-resistant prints. Each T-shirt is designed to offer comfort, durability, and style — making it ideal for both personal use and gifting. The company maintains strict quality control protocols, ensuring that every piece meets the expectations of American consumers.",
      "The brand's success on Amazon USA is a testament to its strategic vision. By choosing Amazon as its primary sales channel, Smart-Wears taps into a vast marketplace with millions of active buyers. The platform's logistics and customer service infrastructure allow Smart-Wears to offer fast shipping, easy returns, and reliable customer support — all while maintaining competitive pricing. This direct-to-consumer model eliminates middlemen, reduces overhead, and allows the company to invest more in product quality and innovation.",
      "Smart-Wears also reflects a broader shift in global fashion toward ethical sourcing and transparency. Bangladesh's garment industry has made significant strides in improving factory conditions, reducing environmental impact, and empowering workers — especially women. Smart-Wears partners with certified factories that uphold these values, ensuring that every T-shirt is not just well-made, but responsibly produced.",
      "Looking ahead, Smart-Wears aims to expand its product line to include polos, sweatshirts, and activewear — all made in Bangladesh and tailored for the U.S. market. The company is also exploring sustainable fabrics like organic cotton and recycled blends, aligning with the growing demand for eco-friendly fashion.",
      "In essence, Smart-Wears is more than just a T-shirt brand. It's a symbol of Bangladesh's global leadership in garment production and a model for how small companies can thrive by combining local expertise with global reach. As consumers become more conscious of quality and ethics, Smart-Wears stands poised to become a trusted name in everyday fashion — one T-shirt at a time.",
    ],
  };

  const data = content || defaultContent;

  return (
    <div className="bg-white py-8 md:py-16 lg:py-24 xl:py-32 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12">
        {data.title}
      </h1>

      <section className="w-full container mx-auto text-black flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center lg:text-4xl font-semibold text-gray-900 leading-tight">
          {data.heading}
        </h1>

        <div className="space-y-4 md:space-y-6 lg:space-y-8 text-justify">
          {data.paragraphs.map((para: string, index: number) => (
            <p
              key={index}
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-gray-700"
            >
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
