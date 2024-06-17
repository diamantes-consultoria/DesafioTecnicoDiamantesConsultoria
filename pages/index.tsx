import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Content from "@/components/Main";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

interface Roupa {
  id: number;
  nome: string;
  preco: number;
}
export default function Home() {
  // const [roupas, setRoupas] = useState<Roupa[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchRoupas = async () => {
  //     const res = await fetch("/api/roupas");
  //     const data = await res.json();
  //     setRoupas(data);
  //   };
  //
  //   fetchRoupas();
  // }, []);

  return (
    <div>
      <Header />
      <Content />
      {/* <button */}
      {/*   onClick={() => setIsModalOpen(true)} */}
      {/*   className="bg-black  text-white font-bold py-2 px-4 rounded" */}
      {/* > */}
      {/*   Adicionar Produto + */}
      {/* </button> */}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      {/* <ul> */}
      {/*   {Array.isArray(roupas) && */}
      {/*     roupas.map((roupa) => ( */}
      {/*       <li key={roupa.id}> */}
      {/*         {roupa.nome} - {roupa.preco} */}
      {/*       </li> */}
      {/*     ))} */}
      {/* </ul> */}
    </div>
  );
}
