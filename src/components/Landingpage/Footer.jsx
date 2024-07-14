import React from "react";
import logo from "/logo.jpg";
import li from "/li.svg";
import x from "/x.svg";
import fbicn from "/fbicn.svg";
import ig from "/ig.svg";
import chat from "/chat.svg";
import Btn from "./Btn";
const Footer = () => {
  return (
    <footer
      id="Contact"
      className="bg-[#013299] text-white  md:h-[732px] py-1 md:py-10"
    >
      <div className="flex flex-col gap-3 justify-start">
        <div className="container mx-auto px-[15px]  md:px-[70px] xl:px-[130px] flex justify-start items-start gap-4 md:gap-12 mt-4 md:mt-10   border-white">
          <div className="w-[65%] md:w-[50%]">
            <div className="flex gap-3 justify-start items-center mb-3 md:mb-6">
              <img
                src={logo}
                alt="Pharmasynthesis"
                className="w-16 h-16 rounded-full "
              />{" "}
              <p className="text-[#fff] text-[16px] font-bold">
                Pharmasynthesis
              </p>
            </div>
            <p className="text-[11px] text-justify md:text-[15px] mb-3 md:mb-6">
              Pharmasynthesis is an online pharmacy designed to transform how
              the pharmaceutical industry operates.
            </p>
            <p className="mb-3 md:mb-8 text-[13px] md:text-[15px] ">
              Email:{" "}
              <a
                href="mailto:pharmasynthesis@gmail.com"
                className="text-[#00CCFF]"
              >
                pharmasynthesis@gmail.com
              </a>
            </p>
            <p className="text-[13px] md:text-[15px] mb-3 md:mb-8">
              Phone No: +234(0)9123456789
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fbicn} alt="Facebook" className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ig} alt="Instagram" className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={li} alt="LinkedIn" className="w-8 h-8" />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={x} alt="X" className="w-8 h-8" />
              </a>
            </div>
          </div>
          <div className="flex justify-start w-[35%] md:w-[50%] items-center gap-8">
            <div className="md:w-[50%]">
              <h3 className="font-bold text-[15px] mt-5 md:mt-4 mb-6">
                Company
              </h3>
              <ul>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/my-account"
                    className="text-blue-200 hover:text-white"
                  >
                    My Account
                  </a>
                </li>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/about-us"
                    className="text-blue-200 hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/privacy-policy"
                    className="text-blue-200 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/terms-conditions"
                    className="text-blue-200 hover:text-white"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/contact-us"
                    className="text-blue-200 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="text-[15px] mb-2 md:mb-4">
                  <a
                    href="/help-faqs"
                    className="text-blue-200 hover:text-white"
                  >
                    Help & FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:w-[50%] hidden md:block">
              <h3 className="font-bold text-[15px] -mt-10 mb-6">
                Subscribe Newsletter
              </h3>
              <p className="text-[15px] mb-6">
                Subscribe to our newsletter to get updates on our latest offers
              </p>
              <div className="mt-4 flex flex-col">
                <input
                  type="email"
                  placeholder="Email address"
                  className="py-2 px-4 rounded-full text-black mb-3"
                />
                <Btn
                  title="Subscribe"
                  linkpath="/#"
                  className="rounded-full w-[50%] flex justify-center items-center py-2 text-[16px] px-16 bg-[#00CCFF]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] px-[15px] block md:hidden">
          <h3 className="font-bold text-[15px] md:text-[15px]  mb-3">
            Subscribe Newsletter
          </h3>
          <p className=" text-[12px] md:text-[15px] md:mb-6">
            Subscribe to our newsletter to get updates on our latest offers
          </p>
          <div className="mt-4 flex  flex-col">
            <input
              type="email"
              placeholder="Email address"
              className="py-2 px-4 rounded-full mb-2 text-black "
            />
            <Btn
              title="Subscribe"
              linkpath="/#"
              className="rounded-full hover:scale-90 w-[50%] flex justify-center items-center py-[6px] md:text-[16px]  bg-[#042129]"
            />
          </div>
        </div>
      </div>
      <hr className="md:mt-[130px] md:mb-[100px]" />
      <div className="flex justify-between px-[15px] md:px-[130px] items-center">
        <p className="text-[10px] md:text-[15px] mb-6">
          Copyright © Pharmasynthesis. 2024. All Rights Reserved.
        </p>
        <img src={chat} alt="chat" />
      </div>
    </footer>
  );
};

export default Footer;
