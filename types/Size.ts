import { Product } from './Product';

export type PostSize = {
  name: string;
};

export type Size = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type PostProductSize = {
  sizeId: number | null;
  quantity: number;
};

export type ProductSize = {
  id: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  size: Size;
  product?: Product;
};
