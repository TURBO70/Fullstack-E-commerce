import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product_model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  goToDetails() {
    this.router.navigate(['/product/details', this.product.id]);
  }

  handleAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);

    this.snackBar.open(`${this.product.name} added to cart 🛒`, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }

  get discountPercent(): number {
    if (this.product.originalPrice) {
      return Math.round(
        ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100,
      );
    }
    return 0;
  }
}
