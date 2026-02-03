import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';

import { Auth } from './features/auth/auth';

import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { OrderComponent } from "./features/profile/order_component/order_component";
import { ParentComponent } from './features/profile/parent-component/parent-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth, Header, Footer, ProductsList, OrderComponent, ParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
}
