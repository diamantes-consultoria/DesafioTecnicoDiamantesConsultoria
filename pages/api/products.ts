import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "./public/uploads";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const uploadMiddleware = promisify(upload.single("image"));

interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      await uploadMiddleware(
        req as unknown as Request,
        res as unknown as Response,
      );
      const { name, value, rating } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : ""; // Provide a default empty string if no file is uploaded
      if (!name || !value) {
        return res.status(400).json({
          error: "Name and value are required",
        });
      }
      const product = await prisma.product.create({
        data: {
          name,
          value: parseFloat(value),
          image,
          rating: rating ? parseFloat(rating) : 5, // Set rating to 5 if not provided
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to add product",
      });
    }
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
