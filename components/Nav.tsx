import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-wrap justify-between py-8">
      <h1 className="font-bold text-black text-3xl pl-8">
        INNOVATION
        <br /> STORE
      </h1>
      <button className="w-2/5 bg-white text-xl border-2 border-black opacity-60 text-black rounded-3xl text-left pl-10">
        Digite o produto que deseja buscar
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-auto bg-black text-2xl  text-white rounded-xl mr-8 p-5"
      >
        Adicionar Produto +
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Nav;
