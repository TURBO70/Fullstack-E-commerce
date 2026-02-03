import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart_service';
import { Product } from '../../shared/models/product_model';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.html',
    styleUrl: './cart.css',
})
export class Cart {
    cartService = inject(CartService);

    addTestProduct() {
        const testProduct: Product = {
            id: 1,
            name: "Red Apples",
            description: "Crisp and sweet red apples",
            price: 4.99,
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
            categoryId: 1,
            stock: 150,
            unit: "kg",
            rating: 4.8,
            reviews: 124,
            isOrganic: true,
            isFeatured: true,
            createdAt: "2024-01-15"
        };
        this.cartService.addToCart(testProduct);
    }
}
