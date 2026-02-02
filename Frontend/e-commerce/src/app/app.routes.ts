import { Routes } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { CategoriesPage } from './features/categories/categories-page/categories-page';

import { Cart } from './features/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'categories', component: CategoriesPage },
  { path: 'products', component: ProductsList },
  { path: 'cart', component: Cart },
];
