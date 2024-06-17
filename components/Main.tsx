import React, { FC } from "react";

const Content: FC = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-0 text-black">
        <ul>
          <li className="w-fit">INNOVATION STORE</li>
          <li className="w-fit">Search bar</li>
          <li className="w-fit">Adicionar produto</li>
        </ul>
      </nav>
    </div>
  );
};

export default Content;
