import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { setDateRange } from "@/store/places/places.slice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dates = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const dispatch = useDispatch();

  // Use media query to detect screen size
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDateChange = (item) => {
    setState([item.selection]);
    dispatch(setDateRange({ startDate: item.selection.startDate, endDate: item.selection.endDate }));
  };

  return (
    <div>
      <DateRangePicker
        ranges={state}
        onChange={handleDateChange}
        rangeColors={["#000"]}
        showDateDisplay={false}
        months={isMobile ? 1 : 2}
        direction={isMobile ? "vertical" : "horizontal"}
        staticRanges={[]}
        inputRanges={[]}
        className="custom-date-range h-full"
      />
      <button
        onClick={() => setState([{ startDate: new Date(), endDate: null, key: "selection" }])}
        className="mt-4 text-primary underline"
      >
        Clear dates
      </button>
    </div>
  );
};

export default Dates;
