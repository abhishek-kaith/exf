import Image from "next/image";
import React from "react";

function Steps() {
  return (
    <section className="container mx-auto px-5 py-12">
      <div className="mb-4 text-center">
        <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          How to Generate Formulas with ExcelFormula AI
        </h2>
      </div>
      <div className="space-y-3">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex w-full items-center justify-center text-center md:text-start">
            <h2 className="text-xl">
              Go to your dashboard and click on Generate Formula.
            </h2>
          </div>
          <video
            controls={false}
            muted
            autoPlay
            loop
            className="aspect-video max-w-[600px]  rounded border-4 border-brand"
          >
            <source src="/home/step1.mp4" />
          </video>
        </div>
        <div className="flex flex-col-reverse gap-5 md:flex-row">
          <video
            controls={false}
            muted
            autoPlay
            loop
            className="aspect-video max-w-[600px]  rounded border-4 border-brand"
          >
            <source src="/home/step2.mp4" />
          </video>{" "}
          <div className="flex w-full items-center justify-center text-center md:text-start">
            <h2 className="text-xl">
              Next, enter your text instructions in the provided text box.
            </h2>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex w-full items-center justify-center text-center md:text-start">
            <h2 className="text-xl">
              Click on Generate and youll receive the formula you need.
            </h2>
          </div>
          <video
            controls={false}
            muted
            autoPlay
            loop
            className="aspect-video max-w-[600px]  rounded border-4 border-brand"
          >
            <source src="/home/step2.mp4" />
          </video>{" "}
        </div>{" "}
      </div>
    </section>
  );
}

export default Steps;
