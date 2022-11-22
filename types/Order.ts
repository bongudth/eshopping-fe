import { Product } from './Product';
import { Size } from './Size';
import { User } from './User';

export type OrderItemProductSize = {
  id: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  size?: Size;
  product: Partial<Product>;
};

export type OrderItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  productSizeId: number;
  quantity: number;
  price: string;
  total: string;
  productSize: OrderItemProductSize;
};

export type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  userId: number;
  total: string;
  address: string;
  name: string;
  phone: string;
  note: string | null;
  orderItems: OrderItem[];
  user: User;
};

export type PostOrder = {
  items: Pick<OrderItem, 'productSizeId' | 'quantity'>[];
  address: string;
  name: string;
  phone: string;
  note: string;
};
