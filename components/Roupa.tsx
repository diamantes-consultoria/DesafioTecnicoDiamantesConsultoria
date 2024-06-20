import React, { FC } from "react";

type RoupaProps = {
  image: string;
  name: string;
  rating: number;
  value: number;
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
      <img
        src={image}
        alt={name}
        className="w-64 h-64 object-cover rounded-lg"
      />
      <div className="text-center mt-4 w-full">
        <h3 className="text-lg font-bold md:text-xl lg:text-2xl">{name}</h3>
        <div className="flex items-center justify-center mt-2">{stars}</div>
        <div className="text-gray-800 font-semibold md:text-lg lg:text-xl">
          R${value}
        </div>
      </div>
    </div>
  );
};

export default Roupa;
