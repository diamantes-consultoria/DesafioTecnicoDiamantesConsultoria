import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Content from "@/components/Nav";
import Nav from "@/components/Nav";
import Main from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

interface Roupa {
  id: number;
  nome: string;
  preco: number;
}
export default function Home() {
  // const [roupas, setRoupas] = useState<Roupa[]>([]);

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
      <Nav />
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
