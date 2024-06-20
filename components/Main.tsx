import Image from "next/image";
import React from "react";

const Main = () => {
  return (
    <div className="text-black p-4 flex flex-col items-center md:flex-row md:justify-between md:items-start md:p-6 lg:p-8">
      <div className="w-full md:w-2/3 md:mr-6 mb-4 md:mb-0 flex flex-col justify-between">
        <h1 className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-10 font-bold">
          Vista-se de elegância e <br className="hidden md:block" /> estilo -
          descubra a moda <br className="hidden md:block" /> perfeita para você
        </h1>

        <ul className="text-base md:text-lg lg:text-2xl flex flex-col md:flex-row">
          <li className="mr-4 md:mr-6 mb-2 md:mb-0">
            <span className="font-bold text-xl md:text-2xl lg:text-4xl">
              +280000
            </span>
            <br />
            Vendas realizadas
          </li>
          <li>
            <span className="font-bold text-xl md:text-2xl lg:text-4xl">
              +40000
            </span>
            <br />
            Produtos disponíveis
          </li>
        </ul>
      </div>

      <div className="w-full md:w-1/3 flex justify-center md:justify-end md:ml-6">
        <Image
          src={"/pessoa.png"}
          alt="Imagem da pessoa"
          width={300}
          height={340}
          className="rounded-lg object-cover"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Main;
