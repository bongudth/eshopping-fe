import { NuxtAppOptions } from '@nuxt/types/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Product } from '~/types/Product';
import { Category } from '~/types/Category';
import { Size } from '~/types/Size';
import { Order } from '~/types/Order';
import { Discount } from '~/types/Discount';
import { Receipt } from '~/types/Receipt';

import RestService from './RestService';

export const initApiServices = (
  axios: NuxtAxiosInstance,
  app?: NuxtAppOptions
) => ({
  products: new RestService<Product>(axios, 'products', app),
  categories: new RestService<Category>(axios, 'categories', app),
  sizes: new RestService<Size>(axios, 'sizes', app),
  orders: new RestService<Order>(axios, 'orders', app),
  discounts: new RestService<Discount>(axios, 'discounts', app),
  receipts: new RestService<Receipt>(axios, 'receipts', app),
});

export type ServiceFactory = ReturnType<typeof initApiServices>;

export default initApiServices;
