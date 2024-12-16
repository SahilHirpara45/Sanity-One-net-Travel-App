import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMonth } from "@/store/places/places.slice";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Months = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const dispatch = useDispatch();
  const selectesMonth = useSelector((state) => state.places.month);

  useEffect(() => {
    setSelectedMonth(selectesMonth);
  }, []);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    dispatch(setMonth(month));
  };

  return (
    <div className="grid grid-cols-4 place-items-center gap-4 p-4">
      {months.map((month, index) => (
        <button
          key={index}
          className={`h-16 w-16 rounded-full ${selectedMonth === month ? "bg-black text-white" : "bg-transparent text-black"}`}
          onClick={() => handleMonthClick(month)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default Months;
