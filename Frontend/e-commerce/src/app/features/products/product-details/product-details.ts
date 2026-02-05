import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product_service';
import { Product } from '../../../shared/models/product_model';
import { Category } from '../../../shared/models/category_model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category_service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetailsComponent implements OnInit {
  product = signal<Product | null>(null);
  categoryName = signal<Category | null>(null);
  quantity = signal(1);
  productId = 0;
  constructor(
    private activeroute: ActivatedRoute,
    private productservice: ProductService,
    private categoryservice: CategoryService,
  ) {
    this.productId = this.activeroute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //if (this.productId) {
    this.productservice.getById('1').subscribe({
      next: (data) => {
        console.log('Fetched product:', data);
        this.product.set(data);
      },
      error: (err) => console.error('Error fetching product:', err),
    });
    this.categoryservice.getById("2").subscribe({
      next: (categoryData) => {
        this.categoryName.set(categoryData);
        console.log('Fetched category:', categoryData);
      },
      error: (err) => console.error('Error fetching category:', err),
    });
    // }
  }

  updateQuantity(step: number) {
    if (this.quantity() + step >= 1) {
      this.quantity.update((q) => q + step);
    }
  }
}
