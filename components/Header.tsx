import React, { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header>
      <nav className="flex justify-center items-center bg-black text-2xl h-16 p-8">
        <ul>
          <li>
            <Link href="/">Ganhe 25% de desconto na primeira compra</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
