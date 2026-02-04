import { Component, signal } from '@angular/core';
import { ProductService } from '../../core/services/product_service';
import { UserService } from '../../core/services/user_service';
import { OrderService } from '../../core/services/order_service';
import { Product } from '../../models/product_model';
import { user } from '../../models/user_model';
import { Order } from '../../models/order_model';

@Component({
  selector: 'app-dashboard-overview',
  imports: [],
  templateUrl: './dashboard-overview.html',
  styles: ``,
})
export class DashboardOverview {
  constructor(private productsService: ProductService, private userService: UserService, private orderService: OrderService) { }
  products = signal<Product[]>([]);
  users = signal<user[]>([]);
  orders = signal<Order[]>([]);
  revenue : number = 0;

  ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.revenue = data.reduce((total, order) => total + order.totalPrice, 0);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
}