import { Component, signal } from '@angular/core';
import { CategoryService } from '../../core/services/category_service';
import { Category } from '../../models/category_model';

@Component({
  selector: 'app-dashboard-categories-list',
  imports: [],
  templateUrl: './dashboard-categories-list.html',
  styles: ``,
})
export class DashboardCategoriesList {

  categories = signal<Category[]>([]);

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories-list:', err);
      }
    });
  }
}
