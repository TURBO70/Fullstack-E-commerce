import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product_service';
import { Product } from '../../../shared/models/product_model';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  product = signal<Product | null>(null);
  quantity = signal(1);
  productId=0;
  constructor(private activeroute:ActivatedRoute, private productservice:ProductService) {
    this.productId = this.activeroute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.productId) {
      this.productservice.getById(this.productId).subscribe({
        next: (data) => {
          this.product.set(data);
        },
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }

  updateQuantity(step: number) {
    if (this.quantity() + step >= 1) {
      this.quantity.update(q => q + step);
    }
  }
}
