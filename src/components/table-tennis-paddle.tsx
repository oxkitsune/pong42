import React from "react";

interface TableTennisPaddleProps {
  className?: string;
  width?: number;
  height?: number;
  paddleColor?: string;
  handleColor?: string;
  accentColor?: string;
}

const TableTennisPaddle: React.FC<TableTennisPaddleProps> = ({
  className,
  width = 24,
  height = 24,
  paddleColor = "#DD2E44",
  handleColor = "#D99E82",
  accentColor = "#FFCC4D",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill={paddleColor}
        d="M23.106 5.971C17.615.48 8.384-.521 3.307 4.557C-1.77 9.634-.77 18.865 4.721 24.356c3.554 3.554 7.785 4.323 11.707 3.058l-.015.013l.13-.052c.264-.088.527-.179.788-.284a24.449 24.449 0 0 1 2.942-.806c1.848-.38 3.541 1.606 4.955 3.021c1.414 1.414 4.242 5.657 4.949 6.364c.707.707 1.414 0 2.122-.707l.707-.707l.707-.707c.707-.708 1.414-1.415.707-2.122c-.707-.707-4.95-3.535-6.364-4.949c-1.414-1.414-3.4-3.107-3.021-4.955a24.32 24.32 0 0 1 .653-2.481c1.974-4.222 1.537-8.952-2.582-13.071z"
      />
      <path
        fill={handleColor}
        d="M15.564 27.655c.289-.07.578-.149.864-.241l-.015.013l.13-.052c.264-.088.527-.179.788-.284a24.449 24.449 0 0 1 2.942-.806c1.848-.38 3.541 1.606 4.955 3.021c1.414 1.414 4.242 5.657 4.949 6.364c.707.707 1.414 0 2.122-.707l.707-.707l.707-.707c.707-.708 1.414-1.415.707-2.122c-.707-.707-4.95-3.535-6.364-4.949c-1.414-1.414-3.4-3.107-3.021-4.955a24.32 24.32 0 0 1 .653-2.481c.357-.764.633-1.543.824-2.334L15.564 27.655z"
      />
      <path
        fill={accentColor}
        d="M20.277 22.942l1.414-1.414l12.022 12.021l-1.414 1.414z"
      />
      <circle fill="#CCD6DD" cx="31.5" cy="6.5" r="3.5" />
    </svg>
  );
};

export default TableTennisPaddle;
