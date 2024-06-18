import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Content from "@/components/Nav";
import Nav from "@/components/Nav";
import Main from "@/components/Main";
import Bar from "@/components/Bar";

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
      <Bar
        text="Ganhe 25% de desconto na primeira compra"
        textSize="text-2xl"
      />
      <Nav />
      <Main />
      <Bar text="INNOVATION STORE" textSize="text-5xl" padding="p-16" />
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
