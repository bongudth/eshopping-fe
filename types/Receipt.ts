import { ReceiptProduct, PostProduct } from './Product';
import { ProductSize } from './Size';

export type PostReceiptProduct = {
  productSizeId: ProductSize['id'];
  quantity: ProductSize['quantity'];
  price: PostProduct['price'];
};

export type PostReceipt = {
  products: PostReceiptProduct[];
  note?: string;
};

export type Receipt = {
  id: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  note: string;
  receiptProducts: ReceiptProduct[];
};
