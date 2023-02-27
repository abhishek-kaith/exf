import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

function Feature({
  imageScr,
  text,
  headingOne,
  headingTwo,
}: {
  imageScr: string;
  text: string;
  headingOne: string;
  headingTwo: string;
}) {
  return (
    <section className="mx-auto max-w-5xl space-y-4 px-5 py-12">
      <h2 className="title-font flex items-center justify-center gap-5 text-3xl font-semibold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
        <span>{headingOne}</span>
        <span>
          <FaLongArrowAltRight className="text-brand" />
        </span>
        <span>{headingTwo}</span>
      </h2>
      <p className="text-center">{text}</p>
      <div className="relative h-[350px] w-full md:h-[500px] ">
        <Image
          src={imageScr}
          alt="explain formual"
          className="overflow-hidden rounded-lg border-4 border-brand object-cover"
          fill={true}
        />
      </div>
    </section>
  );
}
export default Feature;
