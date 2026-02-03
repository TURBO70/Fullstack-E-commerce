import { Component, OnInit } from '@angular/core';
// import { createNewOrder } from '../../../core/utils/orders.helpers';
import { OrderService } from '../../../core/services/order_service';


@Component({
  selector: 'app-order-component',
  imports: [],
  templateUrl: './order_component.html',
  styleUrl: './order_component.css',
})
export class OrderComponent implements OnInit {
  constructor(private OrderService: OrderService) {}

  ngOnInit() {
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

}
