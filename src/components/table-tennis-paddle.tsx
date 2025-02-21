import React from "react";
import Image from "next/image";

import tableTennisPaddle from "@/table-tennis-paddle.svg";

interface TableTennisPaddleProps {
  className?: string;
  width?: number;
  height?: number;
}

const TableTennisPaddle: React.FC<TableTennisPaddleProps> = ({
  className,
  width = 24,
  height = 24,
}) => {
  return (
    <Image
      src={tableTennisPaddle}
      alt="Table Tennis Paddle"
      className={className}
      width={width}
      height={height}
    />
  );
};

export default TableTennisPaddle;
