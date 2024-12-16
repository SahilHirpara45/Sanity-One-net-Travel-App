"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RiHeartsLine } from "react-icons/ri";
import {
  MdArrowOutward,
  MdArrowForwardIos,
  MdArrowBackIosNew,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesData, setHoveredPlace } from "@/store/places/places.slice";
import { GoArrowRight } from "react-icons/go";
const AllCards = ({isMobile,mobilePage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const dispatch = useDispatch();

  const places = useSelector((state) => state.places.placesData);
  const isLoading = useSelector((state) => state.places.loading);
  const filter = useSelector((state) => state.places.filter);
  const bounds = useSelector((state) => state.places.boundsData);
  const season = useSelector((state) => state.places.season);
  const month = useSelector((state) => state.places.month);
  const dateRange = useSelector((state) => state.places.dateRange);
  const travellers = useSelector((state) => state.places.travellers);

  useEffect(() => {
    dispatch(
      getPlacesData({
        filter: filter,
        ...bounds,
        season: season,
        month: month,
        // dateRange: dateRange,
        travellers,
      })
    );
    setCurrentPage(1);
  }, [dispatch, filter, bounds, season, month, dateRange, travellers]);

  const totalPages = Math.ceil(places?.length / cardsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderSkeleton = () => (
    <div className="max-w-sm rounded-lg overflow-hidden animate-pulse">
      <div className="relative w-full pb-[56.25%] bg-gray-300"></div>
      <div className="pt-4 flex flex-col space-y-2">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  const handleMouseEnter = (place) => {
    dispatch(setHoveredPlace(place._id)); // Set the hovered place ID in the Redux store
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredPlace(null)); // Clear the hovered place ID when the mouse leaves the card
  };

  // const displayedPlacesM = isMobile
  //   ? places.slice(0, mobilePage * cardsPerPage)
  //   : places.slice(0, cardsPerPage);

    const displayedPlaces = isMobile
    ? places.slice(0, mobilePage * cardsPerPage)
    : places.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
  
 
  // console.log(displayedPlaces,"displayedPlaces");
  
  return (
    <>
      <div className="flex flex-col md:flex-row bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-10 w-full">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? [...Array(cardsPerPage)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderSkeleton()}
                  </motion.div>
                ))
              : displayedPlaces.map((card, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    // whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={() => handleMouseEnter(card)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative w-full pb-[56.25%]">
                      <motion.div
                        className="absolute w-full h-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <Image
                          src={urlFor(card.image).url()}
                          alt={`Image for ${card.title}`}
                          priority
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </motion.div>
                      {card.match && (
                        <span className="bg-[#D3E172] text-[#04341D] text-sm font-semibold px-2 py-1 rounded-full absolute top-2 right-2 text-center my-auto">
                          <RiHeartsLine className="inline-block mr-1 w-4 h-4 text-sm" />{" "}
                          {card.match} match
                        </span>
                      )}
                    </div>
                    {/* <motion.div
                      whileHover={{ scale: 0.97 }}
                      transition={{ duration: 0.5 }}
                    > */}
                    <div className="pt-4 flex flex-col">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{card.title}</h2>
                      </div>
                      <p className="text-[#77787C] text-base">
                        {card.city}, {card.country}
                      </p>
                      <a
                        href="#"
                        className="text-sm font-semibold hover:underline flex justify-start items-center gap-3 mt-4"
                      >
                        Discover <GoArrowRight size={24} className="" />
                      </a>
                    </div>
                    {/* </motion.div> */}
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
      </div>

      {!isLoading && places.length > 0 && (
        <div className="hidden md:flex items-center justify-center space-x-2 w-full max-w-screen-md mx-auto mt-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              key="prev-arrow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MdArrowBackIosNew
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer"
                }
              />
            </motion.div>

            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`h-8 w-8 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "border border-zinc-300 hover:bg-zinc-100"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.button>
            ))}

            <motion.div
              key="next-arrow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MdArrowForwardIos
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer"
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default AllCards;
