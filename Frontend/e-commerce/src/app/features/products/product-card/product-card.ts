import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product_model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
 @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

  handleAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }
  
  get discountPercent(): number {
    if (this.product.originalPrice) {
      return Math.round(
        ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
      );
    }
    return 0;
  }

}
