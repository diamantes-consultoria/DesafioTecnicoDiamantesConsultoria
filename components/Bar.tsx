import React, { FC } from "react";
import Link from "next/link";

export type BarProps = {
  text: string;
  textSize?: string;
  padding?: string;
};

const Bar: FC<BarProps> = ({
  text,
  textSize = "text-sm sm:text-base md:text-lg lg:text-2xl",
  padding = "p-2 sm:p-4 md:p-6 lg:p-8",
}) => {
  return (
    <header>
      <nav
        className={`flex justify-center items-center bg-black h-16 ${padding} ${textSize}`}
      >
        <ul>
          <li>
            <Link href="/" className="text-white no-underline">
              {text}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Bar;
