"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesData, setFilter } from "@/store/places/places.slice";
import { HiOutlineSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";
import AdventureImg from "../../public/assets/images/img-components/AdventureImg";
import ArtsCultureImg from "../../public/assets/images/img-components/ArtsCultureImg";
import AttractionImg from "../../public/assets/images/img-components/AttractionImg";
import FamilyKidsImg from "../../public/assets/images/img-components/FamilyKidsImg";
import NatureImg from "../../public/assets/images/img-components/NatureImg";
import OutdoorToursImg from "../../public/assets/images/img-components/OutdoorToursImg";
import ShoppingImg from "../../public/assets/images/img-components/ShoppingImg";
import WellbeingImg from "../../public/assets/images/img-components/WellbeingImg";

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const bounds = useSelector((state) => state.places.boundsData);
  const season = useSelector((state) => state.places.season);
  const month = useSelector((state) => state.places.month);
  const dateRange = useSelector((state) => state.places.dateRange);
  const travellers = useSelector((state) => state.places.travellers);

  const filterItems = [
    { Icon: AdventureImg, label: "Adventure" },
    { Icon: ArtsCultureImg, label: "Arts & Culture" },
    { Icon: AttractionImg, label: "Attractions" },
    { Icon: FamilyKidsImg, label: "Family & Kids" },
    { Icon: NatureImg, label: "Nature & Sightseeing" },
    { Icon: OutdoorToursImg, label: "Outdoor Tours" },
    { Icon: ShoppingImg, label: "Shopping & Entertainment" },
    { Icon: WellbeingImg, label: "Wellbeing" },
  ];

  const handleFilterClick = (label) => {
    setActiveFilter(label);
    dispatch(
      getPlacesData({
        filter: label,
        ...bounds,
        season: season,
        month: month,
        // dateRange: dateRange,
        travellers,
      })
    );
    dispatch(setFilter(label));
  };

  const handleSearchClick = () => {
    if (isSearchExpanded && searchInput) {
      setActiveFilter(searchInput);
      dispatch(
        getPlacesData({
          filter: activeFilter,
          ...bounds,
          season: season,
          month: month,
          // dateRange: dateRange,
          travellers,
        })
      );
      dispatch(setFilter(searchInput));
    } else {
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  useEffect(() => {
    if (activeFilter) {
      dispatch(
        getPlacesData({
          filter: activeFilter,
          ...bounds,
          season: season,
          month: month,
          // dateRange: dateRange,
          travellers,
        })
      );
    }
  }, [bounds, activeFilter, season, month, dateRange, travellers]);

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="sticky top-0 bg-white z-10">
      <motion.div
        className="flex items-center justify-around xl:justify-center gap-12 xl:gap-12 2xl:gap-24 py-4 px-6 overflow-x-auto overflow-y-hidden"
        style={{ whiteSpace: "nowrap" }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filterItems.map(({ Icon, label }, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center justify-center cursor-pointer ${
              activeFilter === label ? "text-primary" : "text-[#77787C]"
            }`}
            whileHover={{ scale: 1.1 }}
            variants={itemVariants}
            onClick={() => handleFilterClick(label)}
          >
            <Icon
              color={activeFilter === label ? "#000000" : "#77787C"}
              width={24}
              height={24}
            />
            <span className="text-sm font-bold mt-2 relative group">
              {label}
              {activeFilter === label && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#000000] transition-transform duration-300 transform" />
              )}
            </span>
          </motion.div>
        ))}
        <motion.div
          className={`flex items-center justify-center h-12 rounded-full mx-2 ${
            isSearchExpanded ? "border px-3" : ""
          }`}
          variants={itemVariants}
        >
          {isSearchExpanded && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isSearchExpanded ? 200 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-none outline-none px-2 w-full"
                placeholder="Enter category..."
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
              />
            </motion.div>
          )}
          <HiOutlineSearch
            className="text-[#77787C] w-6 h-6 cursor-pointer"
            onClick={handleSearchClick}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Filters;
