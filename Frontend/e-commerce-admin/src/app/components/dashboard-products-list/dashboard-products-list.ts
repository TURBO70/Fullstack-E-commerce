import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/product_model';
import { ProductService } from '../../core/services/product_service';
import { Category } from '../../models/category_model';
import { CategoryService } from '../../core/services/category_service';

@Component({
  selector: 'app-dashboard-products-list',
  imports: [],
  templateUrl: './dashboard-products-list.html',
  styles: ``,
})
export class DashboardProductsList {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products-list:', err);
      }
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories-list:', err);
      }
    });
  }

  productsWithCategory = computed(() => {
    const products = this.products()
    const categories = this.categories();

    const categoryMap = new Map(
      categories.map(c => [Number(c.id), c.name])
    );

    return products.map(p => ({
      ...p,
      categoryName: categoryMap.get(p.categoryId) ?? 'Unknown'
    }));
  });


}
