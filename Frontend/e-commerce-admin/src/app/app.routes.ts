import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Error } from './components/error/error';

export const routes: Routes = [
    {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
    {path: 'admin/dashboard', component: Dashboard},
    {path: '**', component: Error}
];
