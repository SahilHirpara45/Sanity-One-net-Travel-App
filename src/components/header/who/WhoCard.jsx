import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { setTravelers } from "@/store/places/places.slice";
import SoloSvg from "../../../../public/assets/images/img-components/SoloSvg";
import CoupleSvg from "../../../../public/assets/images/img-components/CoupleSvg";
import FamilySvg from "../../../../public/assets/images/img-components/FamilySvg";
import FriendsSvg from "../../../../public/assets/images/img-components/FriendsSvg";

const WhoCard = ({ onClose }) => {
  const [whoValue, setWhoValue] = useState("");
  const dispatch = useDispatch();
  const selectedTraveller = useSelector((state) => state.places.travellers);

  useEffect(() => {
    setWhoValue(selectedTraveller);
  }, []);

  const handleSelection = (label) => {
    setWhoValue(label);
    dispatch(setTravelers(label));
  };

  return (
    <div>
      <div
        id="dropdownBgHover"
        className="w-[375px] md:w-full md:min-w-[580px] h-full bg-[#F9F9F9] rounded-xl p-4"
        style={{ boxShadow: "0px 5px 15px 0px #00000026" }}
      >
        <div className="flex justify-end items-center">
          <button className="cursor-pointer text-black" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className="text-xl font-bold text-center">
          Choose your travellers
        </div>
        <div className="flex justify-center gap-8 md:gap-16 py-8">
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => handleSelection("Solo")}
          >
            <SoloSvg
              backgroundColor={
                whoValue === "" || whoValue === "Solo" ? "#079EA5" : "#77787C"
              }
            />
            <div className="text-center text-md">Solo</div>
          </div>
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => handleSelection("Couple")}
          >
            <CoupleSvg
              backgroundColor={
                whoValue === "" || whoValue === "Couple" ? "#079EA5" : "#77787C"
              }
            />
            <div className="text-center text-md">Couple</div>
          </div>
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => handleSelection("Family")}
          >
            <FamilySvg
              backgroundColor={
                whoValue === "" || whoValue === "Family" ? "#079EA5" : "#77787C"
              }
            />
            <div className="text-center text-md">Family</div>
          </div>
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => handleSelection("Friends")}
          >
            <FriendsSvg
              backgroundColor={
                whoValue === "" || whoValue === "Friends"
                  ? "#079EA5"
                  : "#77787C"
              }
            />
            <div className="text-center text-md">Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoCard;
