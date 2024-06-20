import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Main from "@/components/Main";
import Bar from "@/components/Bar";
import Roupa, { RoupaProps } from "@/components/Roupa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState<RoupaProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched products:", data);
          setProducts(data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Bar
        text="Ganhe 25% de desconto na primeira compra."
        textSize="text-base md:text-lg lg:text-2xl"
        padding="p-2 md:p-4 lg:p-10"
      />
      <Nav />
      <Main />
      <Bar
        text="INNOVATION STORE"
        textSize="text-base md:text-lg lg:text-4xl"
        padding="p-4 md:p-8 lg:p-14"
      />
      <div className="flex flex-wrap justify-center w-full">
        {products.map((product) => (
          <Roupa
            id={product.id}
            image={product.image}
            name={product.name}
            rating={product.rating}
            value={product.value}
          />
        ))}
      </div>
    </div>
  );
}
