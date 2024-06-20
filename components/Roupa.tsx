import React, { FC } from "react";
import Image from "next/image";

export type RoupaProps = {
  id: string;
  name: string;
  rating: number;
  value: number;
  image: string;
};

const Roupa: FC<RoupaProps> = ({ image, name, rating, value }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="material-icons text-yellow-500">
          star
        </span>,
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <span key={i} className="material-icons text-yellow-500">
          star_half
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="material-icons text-gray-300">
          star_border
        </span>,
      );
    }
  }

  return (
    <div className="flex flex-col items-center border p-4 rounded-lg shadow-md text-black w-full md:w-1/2 lg:w-1/4">
      <Image
        src={image}
        alt={name}
        className="object-fill rounded-lg"
        width={256}
        height={256}
      />
      <div className="text-center mt-4 w-full">
        <h3 className="text-lg md:text-xl lg:text-2xl">{name}</h3>
        <div className="flex items-center justify-center mt-2">{stars}</div>
        <div className="text-gray-800 md:text-lg lg:text-xl">
          R${value.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Roupa;
