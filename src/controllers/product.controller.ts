// src/controllers/productController.ts
import { Request, Response } from 'express';
import { ProductService } from '../model/services/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  create = async (req: Request, res: Response) => {
    const { name, price, user, photo } = req.body;
    try {
      const product = await this.productService.create({
        name,
        price,
        user,
        photo,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error creating product ' });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.list();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: 'Error listing products ' });
    }
  };

  find = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await this.productService.find(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error finding product ' });
    }
  };

  stockIn = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
      await this.productService.stockIn(id, amount);
      res.status(200).json({ message: 'Stock updated' });
    } catch (error) {
      res.status(400).json({ error: 'Error stocking in product' });
    }
  };

  stockOut = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
      await this.productService.stockOut(id, amount);
      res.status(200).json({ message: 'Stock updated' });
    } catch (error) {
      res.status(400).json({ error: 'Error stocking out product ' });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, photo } = req.body;
    try {
      await this.productService.update(id, name, price, photo);
      res.status(200).json({ message: 'Product updated' });
    } catch (error) {
      res.status(400).json({ error: 'Error updating product ' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.productService.delete(id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting product ' });
    }
  };
}
