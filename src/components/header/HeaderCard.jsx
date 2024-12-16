"use client";
import Image from "next/image";
import React, { useState } from "react";
import WhenCard from "./when/WhenCard";
import WhoCard from "./who/WhoCard";
import MoreInfo from "./more/MoreInfo";
import { motion } from "framer-motion";

const HeaderCard = () => {
  const [value, setValue] = useState("");

  // Animation variants for the header card
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // <div className="select-none relative">
    <>
      <motion.div
        className="sm:p-8 mb-4 sm:mb-0"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full lg:h-[303px] md:h-[300px] h-[250px] relative flex justify-center items-center mt-5">
          <Image
            src="../assets/images/welcomeHeader.svg"
            alt="sjdsj"
            className="object-cover w-full h-full rounded-xl"
            layout="fill"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <h2 className="lg:text-7xl md:text-4xl text-4xl font-bold text-white mb-2 text-center">
              Personalize your experience
            </h2>
            <div className="relative flex space-x-4 rounded-full bg-[rgba(163,163,163,0.5)] px-4 py-2 min-w-96 min-h-16 border border-[rgba(189,189,189,0.4)]">
              <button
                className={`text-white flex-1 text-center rounded-full hover:bg-white hover:text-black ${value === "when" && "bg-white"}`}
                onClick={() => setValue("when")}
              >
                <span className={`${value === "when" && "text-black"}`}>
                  When
                </span>
              </button>
              {value === "when" && (
                <div className="absolute top-[68px] right-0 md:right-8 z-20">
                  <WhenCard onClose={() => setValue("")} />
                </div>
              )}
              <span className="h-full border-l border-gray-400"></span>
              <button
                className={`text-white flex-1 text-center rounded-full hover:bg-white hover:text-black ${value === "who" && "bg-white"}`}
                onClick={() => setValue("who")}
              >
                <span className={`${value === "who" && "text-black"}`}>
                  Who
                </span>
              </button>
              {value === "who" && (
                <div className="absolute top-[68px] right-0 md:right-[-78px] z-20">
                  <WhoCard
                    onClose={() => {
                      setValue("");
                    }}
                  />
                </div>
              )}
              <span className="h-full border-l border-gray-400"></span>
              <button
                className={`text-white flex-1 text-center rounded-full hover:bg-white hover:text-black ${value === "more" && "bg-white"}`}
                onClick={() => setValue("more")}
              >
                <span className={`${value === "more" && "text-black"}`}>
                  More +
                </span>
              </button>
              {value === "more" && (
                <div className="absolute top-[68px] right-0 md:right-[-158px] z-20">
                  <MoreInfo onClose={() => setValue("")} />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="../assets/images/icon_match.svg"
                alt="arrow"
                height={24}
                width={24}
                layout="intrinsic"
              />
              <span className="text-white">SORT YOUR MATCHES</span>
            </div>

            {/* <div className="relative">
              <button
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Dropdown checkbox{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownBgHover"
                className="absolute top-12 z-100 w-48 bg-white rounded-lg shadow"
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700"
                  aria-labelledby="dropdownBgHoverButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                      <input
                        id="checkbox-item-4"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-600"
                      />
                      <label
                        for="checkbox-item-4"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
    </>

    // </div>
  );
};

export default HeaderCard;
