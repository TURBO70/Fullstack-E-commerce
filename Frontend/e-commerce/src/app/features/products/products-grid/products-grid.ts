import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/models/product_model';
import { ProductCard } from "../product-card/product-card";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-products-grid',
  imports: [ProductCard,FormsModule, CommonModule],
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();
}

