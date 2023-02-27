import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className=" text-gray-800 dark:text-gray-200">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 369.63 379.15"
          className="mr-3 h-[45px]"
        >
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".cls-1{fill:#4caf50;}.cls-2{fill:#bfefbf;}.cls-3{font-size:109.75px;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-3,.cls-4{font-family:Calibri;}.cls-4{font-size:135.14px;}",
              }}
            />
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                className="cls-1"
                d="M3.72,52.17,169.49.17c3-.95,5.94,2.12,5.94,6.26V372.72c0,3.93-2.63,6.94-5.55,6.36L4.11,345.8C1.75,345.33,0,342.62,0,339.44v-281C0,55.45,1.54,52.85,3.72,52.17Z"
              />
              <rect
                className="cls-1"
                x="191.18"
                y="31.55"
                width="177.12"
                height="158.02"
                rx="1.91"
              />
              <rect
                className="cls-2"
                x="192.51"
                y="204.53"
                width="177.12"
                height="145.77"
                rx="1.91"
              />
              <text
                className="cls-3"
                transform="translate(44.91 232.2) scale(1.5 1)"
              >
                X
              </text>
              <text
                className="cls-4"
                transform="translate(230.5 311.94) scale(1.5 1)"
              >
                =
              </text>
              <path
                className="cls-5"
                d="M320.94,110.53q0,2.64-1.14,3.66a3.81,3.81,0,0,1-2.63,1h-75a3.63,3.63,0,0,1-2.58-1c-.73-.68-1.09-1.9-1.09-3.66a5.21,5.21,0,0,1,1-3.5,3.41,3.41,0,0,1,2.68-1.12h75a3.52,3.52,0,0,1,2.77,1.12A5.2,5.2,0,0,1,320.94,110.53Z"
              />
            </g>
          </g>
        </svg>
        <p className=" hidden text-xl font-bold sm:inline-block 2xl:text-2xl">
          Excelformula
        </p>
      </div>
    </Link>
  );
}

export default Logo;
