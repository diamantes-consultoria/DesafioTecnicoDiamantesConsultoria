import React, { FC } from "react";
import Link from "next/link";

export type BarProps = {
  text: string;
  textSize?:
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl"
    | "text-7xl"
    | "text-8xl"
    | "text-9xl"
    | "text-10xl";
  padding?: "p-8" | "p-16";
};

const Bar: FC<BarProps> = ({ text, textSize, padding }) => {
  return (
    <header>
      <nav
        className={`flex justify-center items-center bg-black h-16 p-8 ${textSize} ${padding}`}
      >
        <ul>
          <li>
            <Link href="/">{text}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Bar;
