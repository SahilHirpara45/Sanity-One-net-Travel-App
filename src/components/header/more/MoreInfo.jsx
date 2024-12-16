import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import FreeImg from "../../../../public/assets/images/img-components/FreeImg";
import LowCost from "../../../../public/assets/images/img-components/LowCost";
import CashImg from "../../../../public/assets/images/img-components/CashImg";
import Diamond from "../../../../public/assets/images/img-components/Diamond";
import { getPlacesData } from "@/store/places/places.slice";
import { useDispatch, useSelector } from "react-redux";

const explorerTypes = [
  "Foodie",
  "Adventurer",
  "Family Focused",
  "Outdoorsy",
  "2SLGBTQIA+",
  "Romantic",
  "Arts & Culture Fan",
  "Business Traveller",
  "Hipster",
  "Luxury Traveller",
  "Accessible Traveller",
  "Cruise Traveller",
  "Eco-Conscious",
  "Pet Owner",
  "Day Tripper",
];

const accessibilityOptions = [
  "No stairs or steps",
  "Accessible parking lot",
  "Accessible washroom",
  "Braille signage",
  "Assistive listening devices",
];

const languages = ["English", "Spanish", "Mandarin", "French", "Cantonese"];

const MoreInfo = ({ onClose }) => {
  const dispatch = useDispatch();
  const bounds = useSelector((state) => state.places.bounds);
  const filter = useSelector((state) => state.places.filter);
  const season = useSelector((state) => state.places.season);
  const month = useSelector((state) => state.places.month);
  // const dateRange = useSelector((state) => state.places.dateRange);
  const travellers = useSelector((state) => state.places.travellers);
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      explorerTypes: [],
      accessibility: [],
      languages: [],
      budget: 25,
    },
  });

  const budget = watch("budget");

  const handleLabelClick = (percentage) => {
    setValue("budget", percentage);
  };

  const onSubmit = (data) => {
    // console.log(data,"data on submit");
    onClose();
    dispatch(
      getPlacesData({
        ...bounds,
        filter,
        season,
        month,
        // dateRange,
        travellers,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        id="dropdownBgHover"
        className="w-[375px] md:w-[673px] max-h-[600px] overflow-y-auto scrollbar-hide bg-[#F9F9F9] rounded-xl"
        style={{ boxShadow: "0px 5px 15px 0px #00000026" }}
      >
        <div className="flex items-center bg-[#F9F9F9] justify-between mb-4 sticky top-0 z-30 p-4">
          <h2 className="text-2xl font-semibold">Preferences</h2>
          <button className="cursor-pointer text-black" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className="px-4">
          {/* Explorer Type */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Explorer Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {explorerTypes.map((type) => (
                <label key={type} className="flex items-center text-sm">
                  <Controller
                    name="explorerTypes"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes(type)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...value, type]
                            : value.filter((item) => item !== type);
                          onChange(newValue);
                        }}
                        sx={{
                          "&.Mui-checked": { color: "#079EA5" },
                          "&.MuiCheckbox-root": { padding: "6px" },
                        }}
                      />
                    )}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div className="w-full border border-[#E0E0E1] mb-4"></div>

          {/* Budget */}
          <div className="">
            <label className="block text-lg font-semibold mb-2">Budget</label>
            <div className="relative">
              <div className="h-8 bg-zinc-300 rounded-full relative">
                <div
                  className="h-8 bg-[#079EA5] rounded-full"
                  style={{ width: `${budget}%` }}
                ></div>
                <div className="flex justify-between items-center w-full absolute mt-[-28px] px-8">
                  <label
                    onClick={() => handleLabelClick(25)}
                    className="cursor-pointer"
                  >
                    <FreeImg color={budget >= 25 ? "white" : "black"} />
                  </label>
                  <label
                    onClick={() => handleLabelClick(50)}
                    className="cursor-pointer"
                  >
                    <LowCost color={budget >= 50 ? "white" : "black"} />
                  </label>
                  <label
                    onClick={() => handleLabelClick(75)}
                    className="cursor-pointer"
                  >
                    <CashImg color={budget >= 75 ? "white" : "black"} />
                  </label>
                  <label
                    onClick={() => handleLabelClick(100)}
                    className="cursor-pointer"
                  >
                    <Diamond color={budget >= 100 ? "white" : "black"} />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1 px-8 mt-2">
                <span className="text-sm">Free</span>
                <span className="text-sm">Low-cost</span>
                <span className="text-sm">Medium</span>
                <span className="text-sm">High</span>
              </div>
            </div>
          </div>
          <div className="w-full border border-[#E0E0E1] my-4"></div>

          {/* Accessibility */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {accessibilityOptions.map((access) => (
                <label
                  key={access}
                  className="flex items-center whitespace-nowrap text-sm"
                >
                  <Controller
                    name="accessibility"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes(access)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...value, access]
                            : value.filter((item) => item !== access);
                          onChange(newValue);
                        }}
                        sx={{
                          "&.Mui-checked": { color: "#079EA5" },
                          "&.MuiCheckbox-root": { padding: "6px" },
                        }}
                      />
                    )}
                  />
                  {access}
                </label>
              ))}
            </div>
          </div>
          <div className="w-full border border-[#E0E0E1] mb-4"></div>

          {/* Language Offered */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Language offered</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {languages.map((language) => (
                <label key={language} className="flex items-center text-sm">
                  <Controller
                    name="languages"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes(language)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...value, language]
                            : value.filter((item) => item !== language);
                          onChange(newValue);
                        }}
                        sx={{
                          "&.Mui-checked": { color: "#079EA5" },
                          "&.MuiCheckbox-root": { padding: "6px" },
                        }}
                      />
                    )}
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          <div className="w-full border border-[#E0E0E1]"></div>
        </div>

        <div className="flex justify-between items-center px-4 py-4 sticky bottom-0 bg-[#F9F9F9]">
          <button
            type="button"
            onClick={() => reset()}
            className="hover:underline"
          >
            Clear all
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Update Sorting
          </button>
        </div>
      </div>
    </form>
  );
};

export default MoreInfo;
