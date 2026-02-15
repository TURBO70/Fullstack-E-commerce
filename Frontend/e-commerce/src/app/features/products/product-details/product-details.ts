import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product_service';
import { Product } from '../../../shared/models/product_model';
import { Category } from '../../../shared/models/category_model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category_service';
import { CartService } from '../../../core/services/cart_service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  productId = '';
  constructor(
    private activeroute: ActivatedRoute,
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {
    this.productId = this.activeroute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.productId) {
    this.productservice.getById(this.productId).subscribe({
      next: (data) => {
        console.log('Fetched product:', data);
        this.product.set(data);
        if(data.categoryId){
          this.categoryservice.getById(data.categoryId.toString()).subscribe({
            next: (categoryData) =>{
              this.categoryName.set(categoryData);
            },
            error:(err) => console.error('Error fetching category:', err),
          });
        }
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }
  }

  updateQuantity(step: number) {
    if (this.quantity() + step >= 1) {
      this.quantity.update((q) => q + step);
    }
  }

  async handleAddToCart() {
    const currentProduct = this.product(); 
    if(currentProduct){
      const selectedQuantity = this.quantity();
      for(let i=0; i< selectedQuantity; i++){
       await this.cartService.addToCart(currentProduct);
      }

     console.log('Product added, current cart items:')
    this.snackBar.open(`${currentProduct.name} added to cart 🛒`, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
      });
    }
  }
}
