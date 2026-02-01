import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from "./features/auth/auth";
import { CategoryService } from './core/services/category_service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  
  }
