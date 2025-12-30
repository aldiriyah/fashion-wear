import Image from "next/image";
import Link from "next/link";
import React from "react";

type InstagramCardProps = {
  image: string;
  alt: string;
  link: string;
};

const InstagramCard = ({ image, alt ,link }: InstagramCardProps) => {
  return (
    <div>
        <Link href={`${link}`} target="_blank">
      <Image
        src={image}
        alt={alt}
        className="w-64 hover:cursor-pointer h-64 object-cover rounded-lg"
        width={256}
        height={256}
      />
      </Link>
    </div>
  );
};

export default InstagramCard;
