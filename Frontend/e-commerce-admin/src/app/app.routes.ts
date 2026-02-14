import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Error } from './components/error/error';
import { DashboardProductsList } from './components/dashboard-products-list/dashboard-products-list';
import { DashboardCategoriesList } from './components/dashboard-categories-list/dashboard-categories-list';
import { DashboardUsersList } from './components/dashboard-users-list/dashboard-users-list';
import { DashboardOrdersList } from './components/dashboard-orders-list/dashboard-orders-list';
import { Auth } from './components/auth/auth';
import { authGuard } from './guards/auth-guard/auth-guard-guard';
export const routes: Routes = [
  { path: '', component: Auth, pathMatch: 'full' },

  {
    path: 'admin/dashboard',
    component: Dashboard,
    canActivateChild: [authGuard],
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },

      { path: 'products', component: DashboardProductsList },
      { path: 'categories', component: DashboardCategoriesList },
      { path: 'users', component: DashboardUsersList },
      { path: 'orders', component: DashboardOrdersList },
    ],
  },

  { path: '**', component: Error },
];
