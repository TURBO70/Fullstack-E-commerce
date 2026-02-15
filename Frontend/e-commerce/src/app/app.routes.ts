import { Routes } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { CategoriesPage } from './features/categories/categories-page/categories-page';
import { Cart } from './features/cart/cart';
import { ProductDetailsComponent } from './features/products/product-details/product-details';
import { ParentComponent } from './features/profile/parent-component/parent-component';
import { authGuard } from './guards/auth-guard/auth-guard-guard';
import { CheckoutComponent } from './features/checkout/checkout';
import { OrderConfirmationComponent } from './features/checkout/order-confirmation/order-confirmation';

export const routes: Routes = [
  { path: 'auth', component: Auth, pathMatch: 'full' },
  { path: 'products', component: ProductsList },
  { path: '', component: Home },
  { path: 'categories', component: CategoriesPage },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: Cart },

  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'user-profile', component: ParentComponent },
      { path: 'user-profile', component: ParentComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'order-confirmation', component: OrderConfirmationComponent },
    ],
  },
  { path: '**', component: Error },
];
