"use client";

import React, { useState, useEffect } from "react";
import GoogleMap from "./googleMap/GoogleMapUI";
import AllCards from "./AllCards";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FaListUl } from "react-icons/fa6";
import { GoArrowDown } from "react-icons/go";

const MapSection = () => {
  const [showList, setShowList] = useState(true);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const places = useSelector((state) => state.places.placesData);

  //ay
  const [mobilePage, setMobilePage] = useState(1);
  //

  useEffect(() => {
    // Check the screen width during initial render
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768; // Adjust the breakpoint as needed
      setIsMobileSize(isMobileView);
      // setShowList(isMobileView); // Show list by default on mobile view
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initial check on mount
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoadMore = () => {
    setMobilePage(mobilePage + 1);
  };

  return (
    <>
      {places?.length > 0 && (
        <div className="text-sm font-500 mb-4 pt-6 pl-8 text-[#77787C]">
          {places?.length} results
        </div>
      )}
      <div className="grid grid-cols-12 gap-4 px-4 md:px-8 pb-8 h-full">
        {(showList || !isMobileSize) && (
          <div className="col-span-12 sm:col-span-6 lg:col-span-8 sm:h-[900px] overflow-y-auto">
            <AllCards isMobile={isMobileSize} mobilePage={mobilePage} />
          </div>
        )}
        {(!showList || !isMobileSize) && (
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 sticky top-0">
            <GoogleMap />
          </div>
        )}
      </div>
      {isMobileSize && (
        <div className="flex justify-center gap-4 mb-4 sticky bottom-2">
          <button
            className="bg-[#000000] flex gap-2 items-center px-4 h-[44px] text-white rounded-md"
            onClick={() => setShowList(!showList)}
          >
            <span>{showList ? "See Map" : "See List"}</span>
            {showList ? (
              <Image
                src="/assets/images/Icon Map.svg"
                alt="map"
                width={16}
                height={16}
              />
            ) : (
              <FaListUl />
            )}
          </button>
          <button
            className="bg-[#ffffff] flex gap-2 items-center px-4 h-[44px] text-black rounded-md border border-black"
            onClick={handleLoadMore}
          >
            <span className="font-bold text-black">Load more</span>

            <GoArrowDown size={24} className="text-black" />
          </button>
        </div>
      )}
    </>
  );
};

export default MapSection;
