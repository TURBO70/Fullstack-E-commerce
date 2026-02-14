import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart_service';
import { OrderService } from '../../core/services/order_service';
import { AuthService } from '../../core/services/auth-service';
import { Order } from '../../shared/models/order_model';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class CheckoutComponent {
    checkoutForm: FormGroup;
    cartService = inject(CartService);
    orderService = inject(OrderService);
    authService = inject(AuthService);
    router = inject(Router);

    constructor(private fb: FormBuilder) {
        const currentUser = this.authService.getCurrentUser();
        
        this.checkoutForm = this.fb.group({
            fullName: [currentUser?.name || '', Validators.required],
            address: ['', Validators.required],
            city: [currentUser?.city || '', Validators.required],
            country: [currentUser?.country || '', Validators.required],
            phone: ['', Validators.required],
            paymentMethod: ['cod', Validators.required]
        });
    }

    get subtotal() {
        return this.cartService.subtotal();
    }

    get shipping() {
        return this.cartService.shipping();
    }

    get tax() {
        return this.cartService.tax();
    }

    get total() {
        return this.cartService.total();
    }

    get items() {
        return this.cartService.cartItems();
    }

    async onSubmit() {
        if (this.checkoutForm.invalid) {
            return;
        }

        const userId = this.authService.currentUserSignal()?.id;
        if (!userId) {
            // Handle not logged in
            return;
        }

        const formValue = this.checkoutForm.value;

        const order: Omit<Order, 'id'> = {
            userId: userId,
            items: this.items.map(item => ({
                productId: item.product.id,
                productTitle: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            })),
            totalPrice: this.total,
            status: 'pending',
            createdAt: new Date().toISOString().split('T')[0],
            shippingAddress: {
                fullName: formValue.fullName,
                address: formValue.address,
                city: formValue.city,
                country: formValue.country,
                phone: formValue.phone
            },
            paymentMethod: formValue.paymentMethod
        };

        try {
            this.orderService.createOrder(order).subscribe({
                next: async (createdOrder) => {
                    await this.cartService.clearCart();
                    this.router.navigate(['/order-confirmation'], { 
                        queryParams: { orderId: createdOrder.id } 
                    });
                },
                error: (err) => console.error('Order creation failed', err)
            });
        } catch (error) {
            console.error('Checkout error', error);
        }
    }
}
