import { Product } from './Product';

export type PostDiscount = {
  name: string;
  percent: number;
  fromDay: string;
  fromTime: string;
  toDay: string;
  toTime: string;
  productIds: number[];
  categoryIds: number[];
};

export type Discount = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  percent: number;
  fromDay: string;
  fromTime: string;
  startDate: string;
  toDay: string;
  toTime: string;
  endDate: string;
  products: Product[];
};
