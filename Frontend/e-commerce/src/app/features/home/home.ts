import { Component, signal } from '@angular/core';
import { CategoryCard } from './components/category-card/category-card';
import { CategoryService } from '../../core/services/category_service';
import { Category } from '../../shared/models/category_model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CategoryCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  category = signal([] as Category[]);
  constructor(catgServ: CategoryService) {
    catgServ.getAll().subscribe({
      next: (data) => {
        this.category.set(data);
        console.log(this.category());
      },
    });
  }
}
