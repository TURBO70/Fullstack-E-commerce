import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order_service';
import { Order } from '../../../shared/models/order_model';

@Component({
    selector: 'app-order-confirmation',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './order-confirmation.html',
    styleUrl: './order-confirmation.css'
})
export class OrderConfirmationComponent implements OnInit {
    orderService = inject(OrderService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    
    orderId: string | null = null;
    order: Order | null = null;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.orderId = params['orderId'];
        });
    }

    getDisplayOrderId(): string {
        if (this.orderId) {
            
            const idStr = String(this.orderId);
            const numericPart = idStr.length > 6 ? idStr.slice(-6) : idStr.padStart(6, '0');
            return `ORD-${numericPart}`;
        }
        return 'ORD-000000';
    }
}

