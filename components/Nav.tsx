import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal";

interface NavProps {
  onSearch: (searchTerm: string) => void;
}

const Nav: FC<NavProps> = ({ onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex flex-wrap justify-between items-center py-8">
      <h1 className="font-bold text-black text-4xl pl-8">
        INNOVATION
        <br /> STORE
      </h1>
      <div className="relative w-1/3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o produto que deseja buscar"
          className="w-full bg-white text-xl border-2 border-black opacity-60 text-black rounded-3xl text-left pl-10 py-3 flex items-center focus:outline-none"
        />
        <FaSearch className="text-xl absolute left-4 top-1/2 transform -translate-y-1/2 text-black opacity-60" />
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-auto bg-black text-2xl text-white rounded-xl mr-8 p-5"
      >
        Adicionar Produto +
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Nav;
