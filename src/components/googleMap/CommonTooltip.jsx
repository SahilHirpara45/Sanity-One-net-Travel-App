import Image from "next/image";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const Tooltip = ({ title, image, link, onClose }) => {
  return (
    <div className="relative w-[270px] md:w-[366px] h-[203px]">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="w-full h-full object-cover"
      />
      <button
        className="absolute cursor-pointer h-6 w-6 top-2 right-2 flex justify-center items-center text-black bg-white rounded-full"
        onClick={onClose}
      >
        <MdClose size={16} />
      </button>
      <div className="absolute flex justify-end  items-center gap-2 p-4 text-white bottom-0">
        <a
          href={"#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline bg-white rounded-full w-11 h-11 flex justify-center items-center cursor-pointer"
        >
          <BsLink45Deg size={28} className="text-black" />
        </a>
        <label className="text-lg font-semibold items-center">
          {title}
        </label>
      </div>
    </div>
  );
};

export default Tooltip;
