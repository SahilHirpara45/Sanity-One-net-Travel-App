"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Seasons from "./Seasons";
import Months from "./Months";
import Dates from "./Dates";

const WhenCard = ({onClose}) => {
  const [value, setValue] = useState(0);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div sx={{ p: 3 }}>{children}</div>}
      </div>
    );
  }

  return (
    <div
      id="dropdownBgHover"
      className="w-[375px] md:w-full md:min-w-[580px] h-full bg-[#F9F9F9] rounded-xl p-4"
      style={{ boxShadow: "0px 5px 15px 0px #00000026" }}
    >
      <div className="flex justify-end items-center">
        <button
          className="cursor-pointer text-black"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>
      </div>

      <div className="flex justify-center mt-1">
        <div className="relative flex h-[59px] w-[397px] md:w-[363px] rounded-full bg-[#E0E0E1] p-2">
          <button
            className={`flex-1 text-center rounded-full ${value === 0 && "bg-white text-black"}`}
            onClick={() => setValue(0)}
          >
            Seasons
          </button>
          <button
            className={`flex-1 text-center rounded-full ${value === 1 && "bg-white text-black"}`}
            onClick={() => setValue(1)}
          >
            Months
          </button>
          <button
            className={`flex-1 text-center rounded-full ${value === 2 && "bg-white text-black"}`}
            onClick={() => setValue(2)}
          >
            Dates
          </button>
        </div>
      </div>

      <CustomTabPanel value={value} index={0}>
        <Seasons />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Months />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Dates />
      </CustomTabPanel>

      {/* <ul
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
      </ul> */}
    </div>
  );
};

export default WhenCard;
