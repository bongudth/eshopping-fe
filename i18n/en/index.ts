import common from './common';
import signin from './signin';
import signup from './signup';
import confirmEmail from './confirmEmail';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import home from './home';
import products from './products';
import cart from './cart';
import orders from './orders';
import account from './account';
import admin from './admin/common';
import adminProducts from './admin/products';
import adminCategories from './admin/categories';
import adminSizes from './admin/sizes';
import adminDiscounts from './admin/discounts';
import adminOrders from './admin/orders';
import adminReceipts from './admin/receipts';
import adminStatistics from './admin/statistics';

export default {
  ...common,
  signin,
  signup,
  confirmEmail,
  forgotPassword,
  resetPassword,
  home,
  products,
  cart,
  orders,
  account,
  ...admin,
  adminProducts,
  adminCategories,
  adminSizes,
  adminDiscounts,
  adminOrders,
  adminReceipts,
  adminStatistics,
  welcome: 'Welcome!',
};
