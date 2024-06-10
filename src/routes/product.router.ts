// src/routes/productRoutes.ts
import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { authenticate } from '@/middlewares/authenticate';
import { ProductRepositoryPrisma } from '@/model/repositories/product.repository';
import { UserRepositoryPrisma } from '@/model/repositories/user.repository';
import { ProductService } from '@/model/services/product.service';
import { prisma } from '@/utils/prisma.util';

const router = Router();
const userRepository = new UserRepositoryPrisma(prisma);
const productRepository = new ProductRepositoryPrisma(prisma, userRepository);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/products', authenticate, productController.create);
router.get('/products', authenticate, productController.list);
router.get('/products/:id', authenticate, productController.find);
router.patch('/products/:id/stock-in', authenticate, productController.stockIn);
router.patch(
  '/products/:id/stock-out',
  authenticate,
  productController.stockOut,
);
router.put('/products/:id', authenticate, productController.update);
router.delete('/products/:id', authenticate, productController.delete);

export { router as productRoutes };
