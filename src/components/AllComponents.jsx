import React from "react";
import Filters from "./Filters";
import MapSection from "./MapSection";
import HeaderCard from "./header/HeaderCard";

const AllComponents = () => {
  return (
    <div>
      <HeaderCard />
      <Filters />
      <MapSection />
    </div>
  );
};

export default AllComponents;
