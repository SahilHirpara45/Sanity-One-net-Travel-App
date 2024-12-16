import React from "react";

const WellbeingImg = ({ color }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.3 20C6.8 20 6.375 19.825 6.025 19.475C5.675 19.125 5.5 18.7 5.5 18.2C5.5 17.85 5.6 17.5208 5.8 17.2125C6 16.9042 6.26667 16.6833 6.6 16.55L10.5 15V12.75C9.6 13.8 8.55417 14.6042 7.3625 15.1625C6.46245 15.5842 5.50773 15.8467 4.49834 15.9498C3.94892 16.006 3.5 15.5523 3.5 15C3.5 14.4477 3.94974 14.0083 4.49731 13.9363C5.24484 13.838 5.94157 13.6259 6.5875 13.3C7.5125 12.8333 8.35 12.1667 9.1 11.3L10.45 9.7C10.65 9.46667 10.8833 9.29167 11.15 9.175C11.4167 9.05833 11.7 9 12 9H13C13.3 9 13.5833 9.05833 13.85 9.175C14.1167 9.29167 14.35 9.46667 14.55 9.7L15.9 11.3C16.65 12.1667 17.4875 12.8333 18.4125 13.3C19.0584 13.6259 19.7552 13.838 20.5027 13.9363C21.0503 14.0083 21.5 14.4477 21.5 15C21.5 15.5523 21.0511 16.006 20.5017 15.9498C19.4923 15.8467 18.5375 15.5842 17.6375 15.1625C16.4458 14.6042 15.4 13.8 14.5 12.75V15L18.4 16.55C18.7333 16.6833 19 16.9042 19.2 17.2125C19.4 17.5208 19.5 17.85 19.5 18.2C19.5 18.7 19.325 19.125 18.975 19.475C18.625 19.825 18.2 20 17.7 20H10.5V19.5C10.5 19.0667 10.6417 18.7083 10.925 18.425C11.2083 18.1417 11.5667 18 12 18H15C15.15 18 15.2708 17.9542 15.3625 17.8625C15.4542 17.7708 15.5 17.65 15.5 17.5C15.5 17.35 15.4542 17.2292 15.3625 17.1375C15.2708 17.0458 15.15 17 15 17H12C11.3 17 10.7083 17.2417 10.225 17.725C9.74167 18.2083 9.5 18.8 9.5 19.5V20H7.3ZM12.5 8C11.95 8 11.4792 7.80417 11.0875 7.4125C10.6958 7.02083 10.5 6.55 10.5 6C10.5 5.45 10.6958 4.97917 11.0875 4.5875C11.4792 4.19583 11.95 4 12.5 4C13.05 4 13.5208 4.19583 13.9125 4.5875C14.3042 4.97917 14.5 5.45 14.5 6C14.5 6.55 14.3042 7.02083 13.9125 7.4125C13.5208 7.80417 13.05 8 12.5 8Z"
        fill={color}
      />
    </svg>
  );
};

export default WellbeingImg;