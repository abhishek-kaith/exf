import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { MdFacebook } from "react-icons/md";
import { siteLinks } from "../../data/siteInfo";
import NavLink from "../NavLink";
import Logo from "./Logo";

function Footer() {
  return (
    <footer>
      <div className="bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto flex flex-col items-center space-y-6 px-4 py-6 md:justify-between lg:flex-row lg:space-y-0">
          <Logo />
          <p className="text-center text-sm text-gray-500 dark:text-gray-300">
            © 2023 ExcelFormula, All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <NavLink href={siteLinks.privacyPolicy} text="Privacy" />
            <NavLink href={siteLinks.termsServerices} text="Legal" />
            <NavLink href={siteLinks.faq} text="FAQ" />
            <a
              href=""
              target="_blink"
              className="text-gray-500 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
             <MdFacebook className="text-2xl" /> 
            </a>
            <a
              href=""
              target="_blink"
              className="text-gray-500 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <IoLogoInstagram className="text-2xl"/>

            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
