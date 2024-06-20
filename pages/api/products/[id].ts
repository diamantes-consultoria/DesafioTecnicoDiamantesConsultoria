import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req });
  //
  // if (!session) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    }

    if (req.method === "PUT") {
      const { name, value, image } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, value, image },
      });
      return res.status(200).json(updatedProduct);
    }

    if (req.method === "DELETE") {
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
