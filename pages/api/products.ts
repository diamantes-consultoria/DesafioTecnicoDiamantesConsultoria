import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      const { name, value } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      if (!name || !value) {
        return res.status(400).json({
          error: "Name and value are required",
        });
      }
      try {
        const product = await prisma.product.create({
          data: {
            name,
            value: parseFloat(value),
            image,
          },
        });
        res.status(201).json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: "Failed to add product",
        });
      }
    });
  } else if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to fetch products",
      });
    }
  } else {
    res.status(405).json({
      error: "Method Not Allowed",
    });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
