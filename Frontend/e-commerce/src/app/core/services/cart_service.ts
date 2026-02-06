import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product_model';
import { firstValueFrom } from 'rxjs';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartItems = signal<CartItem[]>([]);
    private baseUrl = 'http://localhost:3000/carts';
    private userId = '1';

    subtotal = computed(() =>
        this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    );

    tax = computed(() => this.subtotal() * 0.1);

    shipping = computed(() => (this.subtotal() > 50 ? 0 : 10));

    total = computed(() => this.subtotal() + this.tax() + this.shipping());

    constructor(private http: HttpClient) {
        this.loadCart();
    }

    async loadCart() {
        try {
            const carts = await firstValueFrom(this.http.get<Cart[]>(`${this.baseUrl}?userId=${this.userId}`));
            if (carts.length > 0) {
                this.cartItems.set(carts[0].items);
            } else {
                this.cartItems.set([]);
            }
        } catch (error) {
            console.error('Error loading cart', error);
        }
    }

    async addToCart(product: Product) {
        try {
            const carts = await firstValueFrom(this.http.get<Cart[]>(`${this.baseUrl}?userId=${this.userId}`));
            let cart: Cart;

            if (carts.length > 0) {
                cart = carts[0];
                const existingItemIndex = cart.items.findIndex((item) => item.product.id === product.id);

                if (existingItemIndex > -1) {
                    cart.items[existingItemIndex].quantity += 1;
                } else {
                    cart.items.push({ product, quantity: 1 });
                }

                await firstValueFrom(this.http.put(`${this.baseUrl}/${cart.id}`, cart));
            } else {
                const newCart = { userId: this.userId, items: [{ product, quantity: 1 }] };
                const createdCart = await firstValueFrom(this.http.post<Cart>(this.baseUrl, newCart));
                cart = createdCart;
            }

            this.cartItems.set(cart.items);
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    }

    async removeFromCart(productId: string) {
        try {
            const carts = await firstValueFrom(this.http.get<Cart[]>(`${this.baseUrl}?userId=${this.userId}`));
            if (carts.length > 0) {
                const cart = carts[0];
                cart.items = cart.items.filter((item) => item.product.id !== productId);
                await firstValueFrom(this.http.put(`${this.baseUrl}/${cart.id}`, cart));
                this.cartItems.set(cart.items);
            }
        } catch (error) {
            console.error('Error removing from cart', error);
        }
    }

    async updateQuantity(productId: string, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        try {
            const carts = await firstValueFrom(this.http.get<Cart[]>(`${this.baseUrl}?userId=${this.userId}`));
            if (carts.length > 0) {
                const cart = carts[0];
                const item = cart.items.find((item) => item.product.id === productId);
                if (item) {
                    item.quantity = quantity;
                    await firstValueFrom(this.http.put(`${this.baseUrl}/${cart.id}`, cart));
                    this.cartItems.set(cart.items);
                }
            }
        } catch (error) {
            console.error('Error updating quantity', error);
        }
    }

    async clearCart() {
        try {
            const carts = await firstValueFrom(this.http.get<Cart[]>(`${this.baseUrl}?userId=${this.userId}`));
            if (carts.length > 0) {
                const cart = carts[0];
                cart.items = [];
                await firstValueFrom(this.http.put(`${this.baseUrl}/${cart.id}`, cart));
                this.cartItems.set([]);
            }
        } catch (error) {
            console.error('Error clearing cart', error);
        }
    }
}
