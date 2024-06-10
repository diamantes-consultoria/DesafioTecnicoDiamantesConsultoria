import { generateId } from '@/utils/id.util';
import { UserProps } from './user.entity';

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  photo?: string;
  user: UserProps;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  public static create(
    name: string,
    price: number,
    user: UserProps,
    photo?: string,
  ) {
    return new Product({
      id: generateId(5),
      name,
      price,
      quantity: 0,
      photo,
      user,
    });
  }

  public static with(
    id: string,
    name: string,
    price: number,
    quantity: number,
    user: UserProps,
    photo?: string,
  ) {
    return new Product({ id, name, price, quantity, user, photo });
  }

  public stockIn(amount: number) {
    this.props.quantity += amount;
  }

  public stockOut(amount: number) {
    if (this.props.quantity < amount) {
      throw new Error('Insufficient quantity in stock.');
    }
    this.props.quantity -= amount;
  }

  public edit(name: string, price: number, photo?: string) {
    this.props.name = name;
    this.props.price = price;
    if (photo) this.props.photo = photo;
  }
}
