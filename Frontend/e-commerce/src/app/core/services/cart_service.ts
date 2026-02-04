import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product_model';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartItems = signal<CartItem[]>([]);

    subtotal = computed(() =>
        this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    );

    tax = computed(() => this.subtotal() * 0.1);

    shipping = computed(() => (this.subtotal() > 50 ? 0 : 10));





    total = computed(() => this.subtotal() + this.tax() + this.shipping());

    addToCart(product: Product) {
        this.cartItems.update((items) => {
            const existingItem = items.find((item) => item.product.id === product.id);
            if (existingItem) {
                return items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...items, { product, quantity: 1 }];
        });
    }

    removeFromCart(productId: string) {
        this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
    }

    updateQuantity(productId: string, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        this.cartItems.update((items) =>
            items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }

    clearCart() {
        this.cartItems.set([]);
    }
}
