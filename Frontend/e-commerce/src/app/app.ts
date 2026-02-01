import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from "./features/auth/auth";
import { ProductsList } from "./features/products/products-list/products-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth, ProductsList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  
  }
