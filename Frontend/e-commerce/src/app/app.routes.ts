import { Routes } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { CategoriesPage } from './features/categories/categories-page/categories-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'categories', component: CategoriesPage },
  { path: 'products', component: ProductsList },
];
