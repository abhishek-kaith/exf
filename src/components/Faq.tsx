import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface FaqI {
  question: string;
  answer: string;
  isActive: boolean;
}

function Faq() {
  const [faqs, setFaqs] = useState<FaqI[]>(faqArray);
  const handleClick = (faq: FaqI) => {
    setFaqs((prev) => {
      const newFaqs = prev.map((fq) => {
        if (fq.question === faq.question) {
          return {
            question: fq.question,
            answer: fq.answer,
            isActive: !fq.isActive,
          };
        }
        return fq;
      });
      return newFaqs;
    });
  };
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-12">
      <div className="mb-4 text-center">
        <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          FAQ
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          return (
            <div key={idx}>
              <div
                className={`mb-2 flex w-full cursor-pointer items-center justify-between ${
                  !faq.isActive ? "brightness-75" : ""
                } border-b-[1.5px] border-gray-400 pb-4 text-2xl dark:border-gray-600`}
                onClick={() => handleClick(faq)}
              >
                <h3 className="text-xl font-semibold text-primary dark:text-gray-200">
                  {faq.question}
                </h3>
                {faq.isActive ? (
                  <MdOutlineKeyboardArrowUp className="shrink-0" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="shrink-0" />
                )}
              </div>
              {faq.isActive && (
                <div>
                  <p
                    className={`break-all border-b-[1.5px] border-gray-400 pb-4 text-lg dark:border-gray-600`}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;

const faqArray = [
  {
    question: "What is ExelFormula.io?",
    answer:
      "Excelformula.io is an AI-powered tool that generates and explains Excel and Google Sheets formulas based on natural language text instructions. It's designed to simplify the formula creation process and save users time and effort.",
    isActive: true,
  },
  {
    question: "How Does Excelformula.Io Work?",
    answer:
      "Users input their instructions in plain English or any other natural language, and Excelformula.io processes the text and generates the corresponding formula. The tool also provides a detailed explanation of the formula and its components, making it easy for users to understand and use.",
    isActive: false,
  },
  {
    question: "Is Excelformula.Io Easy To Use?",
    answer:
      "Yes, Excelformula.io is designed to be user-friendly and intuitive. Users can input their instructions and generate the corresponding formula with just a few clicks, even if they have no prior experience with formulas.",
    isActive: false,
  },
  {
    question: "What Types Of Formulas Can Excelformula.Io Generate?",
    answer:
      "Excelformula.io can generate a wide range of formulas for both Excel and Google Sheets, including math formulas, date formulas, text formulas, and more.",
    isActive: false,
  },
  {
    question: "Can Excelformula.Io Be Used With Non-English Languages?",
    answer:
      "Excelformula.io supports multiple languages, including English, Spanish, French, German, and Italian. Users can input instructions in their preferred language, and the tool will generate the corresponding formula accordingly.",
    isActive: false,
  },
];
