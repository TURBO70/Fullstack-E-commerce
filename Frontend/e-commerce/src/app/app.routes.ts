import { Routes } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { CategoriesPage } from './features/categories/categories-page/categories-page';
import { Cart } from './features/cart/cart';
import { ProfileComponent } from './features/profile/profile-component/profile-component';
import { OrderComponent } from './features/profile/order_component/order_component';
import { ProductDetailsComponent } from './features/products/product-details/product-details';
import { ParentComponent } from './features/profile/parent-component/parent-component';


  

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'categories', component: CategoriesPage },
  { path: 'products', component: ProductsList },
  { path: 'cart', component: Cart },
  {path: 'user-profile', component: ParentComponent},
  {path: 'product/details/:id', component: ProductDetailsComponent},
  
];
