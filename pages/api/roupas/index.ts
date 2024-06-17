// pages/api/roupas/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    const roupas = await prisma.roupa.findMany();
    res.status(200).json(roupas);
  } else if (req.method === "POST") {
    const { nome, descricao, preco, quantidade } = req.body;
    const novaRoupa = await prisma.roupa.create({
      data: { nome, descricao, preco, quantidade },
    });
    res.status(201).json(novaRoupa);
  } else if (req.method === "PUT") {
    const { id, nome, descricao, preco, quantidade } = req.body;
    const roupaAtualizada = await prisma.roupa.update({
      where: { id },
      data: { nome, descricao, preco, quantidade },
    });
    res.status(200).json(roupaAtualizada);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.roupa.delete({ where: { id } });
    res.status(204).end();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
