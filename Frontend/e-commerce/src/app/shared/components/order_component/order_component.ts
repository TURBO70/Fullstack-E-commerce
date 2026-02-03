import { Component, Input, OnInit, Signal, signal } from '@angular/core';
// import { createNewOrder } from '../../../core/utils/orders.helpers';
import { OrderService } from '../../../core/services/order_service';
import { Order } from '../../models/order_model';


@Component({
  selector: 'app-order-component',
  imports: [],
  templateUrl: './order_component.html',
  styleUrl: './order_component.css',
})
export class OrderComponent{
  // constructor(private OrderService: OrderService) {}
  // activeTab = signal<'profile' | 'orders'>('orders');
  // userOrders = signal<Order[]>([]);

  @Input() userOrders!: Signal<Order[]>;

  // ngOnInit() {
  //     this.OrderService.getOrdersByUserId("1").subscribe({
  //     next: (data) => {
  //       // 2. Use .set() to update the signal value
  //       this.userOrders.set(data);
  //       // console.log('Signal updated with:', data);
  //     },
  //     error: (err) => console.error('Service Error:', err)
  //   });
  // }
    
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
}


