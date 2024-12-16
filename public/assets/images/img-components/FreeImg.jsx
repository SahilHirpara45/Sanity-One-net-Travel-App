import React from "react";

const FreeImg = ({color}) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5833 9.1665C17.0435 9.1665 17.4166 9.5396 17.4166 9.99984C17.4166 10.4272 17.0949 10.7794 16.6804 10.8276L16.5833 10.8332H4.91659C4.45635 10.8332 4.08325 10.4601 4.08325 9.99984C4.08325 9.57247 4.40495 9.22025 4.8194 9.17211L4.91659 9.1665H16.5833Z"
        fill={color}
      />
    </svg>
  );
};

export default FreeImg;
