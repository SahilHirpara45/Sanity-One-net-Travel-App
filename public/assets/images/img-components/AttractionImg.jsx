import React from "react";

const AttractionImg = ({color}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5 4C20.3522 4 20.7974 4.98551 20.2832 5.62253L20.2071 5.70711L16.415 9.5L20.2071 13.2929C20.8097 13.8955 20.4277 14.9072 19.6136 14.994L19.5 15H6.5V21C6.5 21.5128 6.11396 21.9355 5.61662 21.9933L5.5 22C4.98716 22 4.56449 21.614 4.50673 21.1166L4.5 21V5C4.5 4.48716 4.88604 4.06449 5.38338 4.00673L5.5 4H19.5ZM17.084 6H6.5V13H17.085L14.2929 10.2071C13.9324 9.84662 13.9047 9.27939 14.2097 8.8871L14.2929 8.79289L17.084 6Z"
        fill={color}
      />
    </svg>
  );
};

export default AttractionImg;
