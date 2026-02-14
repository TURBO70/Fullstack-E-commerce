import { Component, Input, OnInit, Signal, signal, computed } from '@angular/core';
// import { createNewOrder } from '../../../core/utils/orders.helpers';
import { OrderService } from '../../../core/services/order_service';
import { Order } from '../../../shared/models/order_model';
import { Product } from '../../../shared/models/product_model';
import { ProductService } from '../../../core/services/product_service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-order-component',
  imports: [CommonModule],
  templateUrl: './order_component.html',
  styleUrl: './order_component.css',
})
export class OrderComponent implements OnInit {
  constructor(private productService: ProductService) {}
  // activeTab = signal<'profile' | 'orders'>('orders');
  // userOrders = signal<Order[]>([]);

  @Input() userOrders!: Signal<Order[]>;
  productImages = signal<Map<string, string>>(new Map());

  ngOnInit() {
    // Fetch product images for all unique product IDs in orders
    const orders = this.userOrders();
    const uniqueProductIds = new Set<string>();
    
    orders.forEach(order => {
      order.items.forEach(item => {
        uniqueProductIds.add(item.productId);
      });
    });

    // Fetch all products in parallel
    const productRequests = Array.from(uniqueProductIds).map(productId =>
      this.productService.getById(productId)
    );

    if (productRequests.length > 0) {
      forkJoin(productRequests).subscribe({
        next: (products) => {
          const imageMap = new Map<string, string>();
          products.forEach(product => {
            imageMap.set(product.id, product.image);
          });
          this.productImages.set(imageMap);
        },
        error: (err) => console.error('Error fetching products:', err),
      });
    }
  }

  getProductImage(productId: string): string | null {
    return this.productImages().get(productId) || null;
  }

  getOrderId(orderId: string): string {
    if (!orderId) return 'ORD-000000';
    // Format order ID like ORD-001
    const numericPart = orderId.slice(-3).padStart(3, '0');
    return `ORD-${numericPart}`;
  }

  //     this.OrderService.getOrdersByUserId("1").subscribe({
  //     next: (data) => {
  //       // 2. Use .set() to update the signal value
  //       this.userOrders.set(data);
  //       // console.log('Signal updated with:', data);
  //     },
  //     error: (err) => console.error('Service Error:', err)
  //   });
}
    
  //   setTab(tab: 'profile' | 'orders') {
  //   this.activeTab.set(tab);

    


  
    // const items = [
    //   { productId: 'p1', productTitle: 'Product 1', price: 100, quantity: 2 },
    //   { productId: 'p2', productTitle: 'Product 2', price: 150, quantity: 1 },
    // ];

    // const newOrder = createNewOrder(1, items);
    // console.log('New Order:', newOrder);

    // this.OrderService.createOrder(newOrder).subscribe({
    //   next: (order) => console.log('Order created successfully:', order),
    //   error: (err) => console.error('Error creating order:', err),
    // });



