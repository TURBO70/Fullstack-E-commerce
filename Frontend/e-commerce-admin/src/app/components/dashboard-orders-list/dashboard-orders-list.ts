import { Component, computed, signal } from '@angular/core';
import { Order } from '../../models/order_model';
import { OrderService } from '../../core/services/order_service';
import { user } from '../../models/user_model';
import { UserService } from '../../core/services/user_service';

@Component({
  selector: 'app-dashboard-orders-list',
  imports: [],
  templateUrl: './dashboard-orders-list.html',
  styles: ``,
})
export class DashboardOrdersList {
  orders = signal<Order[]>([]);
  users = signal<user[]>([]);

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

    orderwithUserName = computed(() => {
    const orders = this.orders()
    const users = this.users();

    const userMap = new Map(
      users.map(u => [u.id, u.name])
    );

    return orders.map(o => ({
      ...o,
      customerName: userMap.get(o.userId) ?? 'Unknown'
    }));
  });
}
