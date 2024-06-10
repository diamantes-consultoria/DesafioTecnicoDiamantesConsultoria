// src/repositories/productRepository.ts
import { PrismaClient } from '@prisma/client';
import { Product, ProductProps } from '../entities/product.entity';
import { UserRepository } from './user.repository';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  list(): Promise<Product[]>;
  find(id: string): Promise<Product | null>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}

export class ProductRepositoryPrisma implements ProductRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userRepository: UserRepository,
  ) {}

  async save(product: Product): Promise<void> {
    const user = await this.userRepository.findByEmail(
      product.props.user.email,
    );
    if (!user) throw new Error('User not found!');

    await this.prisma.product.create({
      data: {
        id: product.props.id,
        name: product.props.name,
        price: product.props.price,
        quantity: product.props.quantity,
        photo: product.props.photo,
        userId: product.props.user.id,
      },
    });
  }

  async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: { user: true },
    });
    return products.map((p: ProductProps) =>
      Product.with(p.id, p.name, p.price, p.quantity, p.user, p.photo),
    );
  }

  async find(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!product) return null;
    return Product.with(
      product.id,
      product.name,
      product.price,
      product.quantity,
      product.user,
      product.photo,
    );
  }

  async update(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: { id: product.props.id },
      data: {
        name: product.props.name,
        price: product.props.price,
        quantity: product.props.quantity,
        photo: product.props.photo,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Product not found!');
    await this.prisma.product.delete({ where: { id } });
  }
}
