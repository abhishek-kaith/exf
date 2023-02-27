import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { siteLinks } from "../../../data/siteInfo";
import { authStore } from "../../../data/store";

function Hero() {
  const router = useRouter();
  const { isLogedIn } = authStore();
  return (
    <section className="container mx-auto px-5 py-12 lg:flex">
      <div className="flex w-full flex-col justify-center text-center lg:text-left">
        <h1 className="title-font mb-4 text-3xl font-bold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          Effortlessly Convert Text-Based Instructions into Excel or Google
          Sheets Formulas in Seconds with Excel Formula AI.
        </h1>
        <p className="mb-8 leading-relaxed">
          Say goodbye to formula-hunting! Quickly generate complex Excel or
          Google Sheets formulas with just a few clicks. Its easy, hassle-free,
          and saves you time.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (isLogedIn) {
                router.push(siteLinks.dashboard).catch((e) => {
                  console.log(e);
                });
              } else {
                router.push(siteLinks.login).catch((e) => {
                  console.log(e);
                });
              }
            }}
            className="mx-auto inline-flex rounded border-0 bg-brand py-2 px-6 text-lg text-white hover:brightness-110 focus:outline-none md:mx-0"
          >
            Try it now!
          </button>
          <Image
            src="/home/exel.png"
            alt="Exel"
            height={34}
            width={96}
            className={`hidden h-[34px] overflow-hidden object-contain md:inline`}
          />
          <Image
            src="/home/sheets.png"
            alt="Google docs"
            height={34}
            width={120}
            className={`hidden h-[34px] w-[150px] overflow-hidden md:inline`}
          />
        </div>
      </div>
      <div className="w-full pt-8 lg:p-0">
        <div className="relative   min-h-[350px] w-full ">
          <Image
            sizes="max-w-1080px"
            src="/home/laptop.svg"
            alt="laptop"
            fill={true}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
export default Hero;
