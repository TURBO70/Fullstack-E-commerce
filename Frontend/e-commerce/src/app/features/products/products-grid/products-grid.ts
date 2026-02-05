import { Component, Input, OnInit, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/product_model';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../../../core/services/cart_service';
import { ProductService } from '../../../core/services/product_service';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products-grid.html',
})
export class ProductsGrid implements OnInit, OnChanges {
  @Input() products?: Product[];

  filteredProducts=signal([] as Product[] );

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    if (!this.products) {
      this.productService.getAll().subscribe(data => {
        this.filteredProducts.set(data.filter(p => p.isFeatured)); 
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.filteredProducts.set([...this.products]);
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
