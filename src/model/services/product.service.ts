import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { User, UserProps } from '../entities/user.entity';

export type CreateProductDTO = {
  name: string;
  price: number;
  user: UserProps;
  photo?: string;
};

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async create(data: CreateProductDTO) {
    const product = Product.create(
      data.name,
      data.price,
      data.user,
      data.photo,
    );
    await this.repository.save(product);
    return product;
  }

  async list() {
    return this.repository.list();
  }

  async find(id: string) {
    const product = this.repository.find(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async findByName(name: string) {
    const product = this.repository.findByName(name);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async stockIn(id: string, amount: number) {
    const product = await this.repository.find(id);
    if (!product) throw new Error('Product not found');
    product.stockIn(amount);
    await this.repository.update(product);
  }

  async stockOut(id: string, amount: number) {
    const product = await this.repository.find(id);
    if (!product) throw new Error('Product not found');
    product.stockOut(amount);
    await this.repository.update(product);
  }

  async update(id: string, name: string, price: number, photo?: string) {
    const product = await this.repository.find(id);
    if (!product) throw new Error('Product not found');
    product.edit(name, price, photo);
    await this.repository.update(product);
  }

  async delete(id: string) {
    const product = await this.repository.find(id);
    if (!product) throw new Error('Product not found');
    await this.repository.delete(id);
  }
}
