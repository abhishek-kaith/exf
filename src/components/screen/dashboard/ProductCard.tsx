import Link from "next/link";
import React from "react";

function ProductCard({
  title,
  link,
  desc,
  buttonText,
}: {
  desc: string;
  title: string;
  link: string;
  buttonText: string;
}) {
  return (
    <div className="flex flex-col justify-between space-y-3 rounded bg-gray-200/70 p-5 dark:bg-gray-700/70">
      <div className="space-y-2">
        <h3 className="text-xl font-medium text-black dark:text-white">
          {title} Generate Formula
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{desc}</p>
      </div>
      <Link
        href={link}
        className="block w-full rounded bg-brand py-2 px-3 text-center text-lg text-white hover:brightness-110"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default ProductCard;
