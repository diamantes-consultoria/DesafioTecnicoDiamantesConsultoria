// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";
// import nextConnect from "next-connect";
// import fs from "fs";
// import path from "path";
//
// const prisma = new PrismaClient();
//
// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });
//
// apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession({ req });
//
//   if (!session) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//
//   const { name, value, image } = req.body;
//
//   // Assuming image is a base64 encoded string or a URL
//   let imagePath = null;
//   if (image && typeof image === "string" && image.startsWith("data:image")) {
//     const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
//     const buffer = Buffer.from(base64Data, "base64");
//     const timestamp = Date.now();
//     const fileName = `image_${timestamp}.png`;
//     imagePath = path.join(process.cwd(), "public", "uploads", fileName);
//
//     fs.writeFile(imagePath, buffer, (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//       }
//     });
//
//     imagePath = `/uploads/${fileName}`;
//   }
//
//   try {
//     const newProduct = await prisma.product.create({
//       data: { name, value, image: imagePath },
//     });
//     return res.status(201).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
//
// apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession({ req });
//
//   if (!session) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//
//   try {
//     const products = await prisma.product.findMany();
//     return res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
//
// export default apiRoute;
//
// export const config = {
//   api: {
//     bodyParser: true, // Allow body parsing
//   },
// };

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
        return res.status(500).json({ error: err.message });
      }

      const { name, value } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!name || !value) {
        return res.status(400).json({ error: "Name and value are required" });
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
        res.status(500).json({ error: "Failed to add product" });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
