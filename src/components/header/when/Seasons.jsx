import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeason } from "@/store/places/places.slice";
import SpringSvg from "../../../../public/assets/images/SpringSvg";
import SummerSvg from "../../../../public/assets/images/SummerSvg";
import AutumnSvg from "../../../../public/assets/images/AutumnSvg";
import WinterSvg from "../../../../public/assets/images/WinterSvg";

const Seasons = () => {
  const [seasonValue, setSeasonValue] = useState("");
  const dispatch = useDispatch();
  const season = useSelector((state) => state.places.season);

  useEffect(() => {
    setSeasonValue(season);
  }, []);

  const handleSeasonClick = (seasonName) => {
    setSeasonValue(seasonName);
    dispatch(setSeason(seasonName));
  };

  return (
    <div>
      <div className="flex justify-center gap-8 md:gap-16 py-8">
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => handleSeasonClick("Spring")}
        >
          <SpringSvg
            backgroundColor={
              (seasonValue === "" || seasonValue === "Spring")
                ? "#889D1E"
                : "#77787C"
            }
          />
          <div className="text-center text-md">Spring</div>
        </div>
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => handleSeasonClick("Summer")}
        >
          <SummerSvg
            backgroundColor={
              seasonValue === "" || seasonValue === "Summer"
                ? "#FFAD29"
                : "#77787C"
            }
          />
          <div className="text-center text-md">Summer</div>
        </div>
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => handleSeasonClick("Autumn")}
        >
          <AutumnSvg
            backgroundColor={
              seasonValue === "" || seasonValue === "Autumn"
                ? "#721931"
                : "#77787C"
            }
          />
          <div className="text-center text-md">Autumn</div>
        </div>
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => handleSeasonClick("Winter")}
        >
          <WinterSvg
            backgroundColor={
              seasonValue === "" || seasonValue === "Winter"
                ? "#079EA5"
                : "#77787C"
            }
          />
          <div className="text-center text-md">Winter</div>
        </div>
      </div>
    </div>
  );
};

export default Seasons;
