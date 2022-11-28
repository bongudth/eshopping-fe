import { Discount } from './Discount';
import { Category } from './Category';
import { Image } from './Image';
import { ProductSize, PostProductSize, Size } from './Size';

export type Product = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: string;
  status: string;
  stock: number;
  category: Category;
  productSizes: ProductSize[];
  images: Partial<Image>[];
  discount: Discount[];
};

export type PostProduct = {
  name: string;
  description: string;
  price: number;
  unit: string;
  status?: string;
  categoryId: Category['id'] | null;
  sizes: PostProductSize[];
  images: Partial<Image>[];
};

export type CartProduct = {
  id: Product['id'];
  imageUrl: Image['url'];
  name: Product['name'];
  price: Product['price'];
  productSizeId: ProductSize['id'];
  productSizeName: Size['name'];
  quantity: number;
};

export type ReceiptProduct = {
  id: Product['id'];
  createdAt: Product['createdAt'];
  updatedAt: Product['updatedAt'];
  quantity: ProductSize['quantity'];
  price: Product['price'];
  productSize: ProductSize;
};
