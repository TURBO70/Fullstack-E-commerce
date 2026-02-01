import { Component, signal } from '@angular/core';
import { CategoryCard } from '../../home/components/category-card/category-card';
import { CategoryService } from '../../../core/services/category_service';
import { Category } from '../../../shared/models/category_model';

@Component({
  selector: 'app-categories-page',
  imports: [CategoryCard],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage {
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
