import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Error } from './components/error/error';
import { DashboardProductsList } from './components/dashboard-products-list/dashboard-products-list';
import { DashboardCategoriesList } from './components/dashboard-categories-list/dashboard-categories-list';
import { DashboardUsersList } from './components/dashboard-users-list/dashboard-users-list';
import { DashboardOrdersList } from './components/dashboard-orders-list/dashboard-orders-list';

export const routes: Routes = [
    { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
        path: 'admin/dashboard', component: Dashboard,
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },

            { path: 'products', component: DashboardProductsList },
            { path: 'categories', component: DashboardCategoriesList },
            { path: 'users', component: DashboardUsersList },
            { path: 'orders', component: DashboardOrdersList },
        ]
    },
    { path: '**', component: Error }
];
