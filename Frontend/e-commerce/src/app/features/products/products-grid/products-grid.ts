import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/product_model';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../../../core/services/cart_service';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  @Input() products: Product[] = [];
  @Input() viewMode: 'grid' | 'list' = 'grid';


  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
  }
}
