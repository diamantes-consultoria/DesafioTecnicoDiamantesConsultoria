import Image from "next/image";
import React from "react";

const Main = () => {
  return (
    <div className="text-black p-4 flex flex-col items-center md:flex-row md:justify-start md:items-start md:p-8 lg:p-12">
      <div className="w-full md:w-2/3 md:mt-0 md:mr-8">
        <h1 className="text-4xl mt-48 md:text-6xl mb-8 md:mb-16 font-bold ">
          Vista-se de elegância e <br className="hidden md:block" /> estilo -
          descubra a moda <br className="hidden md:block" /> perfeita para você
        </h1>

        <ul className="text-lg md:text-2xl flex mb-4 md:mb-8">
          <li className="mr-4 md:mr-8">
            <span className="font-bold text-2xl md:text-4xl">+280000</span>
            <br />
            Vendas realizadas
          </li>
          <li>
            <span className="font-bold text-2xl md:text-4xl">+40000</span>{" "}
            <br />
            Produtos disponíveis
          </li>
        </ul>
      </div>

      <div className="w-full mr-48 md:w-1/3 flex justify-center md:justify-end">
        <Image
          src={"/pessoa.png"}
          alt="Imagem da pessoa"
          width={368}
          height={452}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Main;
