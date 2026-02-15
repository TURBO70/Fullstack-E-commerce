import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../features/profile/profile-component/profile-component';
import { OrderComponent } from "../../../features/profile/order_component/order_component";
import { UserService } from '../../../core/services/user_service';
import { OrderService } from '../../../core/services/order_service';
import { user } from '../../../shared/models/user_model';
import { Order } from '../../../shared/models/order_model';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-parent-component',
  imports: [CommonModule, ProfileComponent, OrderComponent],
  templateUrl: './parent-component.html',
})
export class ParentComponent implements OnInit {

  activeTab = signal<'profile' | 'orders'>('profile');
  currentUser = signal<user | null>(null);
  userOrders = signal<Order[]>([]);

  constructor(private userService: UserService, private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
  this.fetchUserData();
  this.fetchUserOrders();
}

fetchUserData() {
const loggedInUser = this.authService.getCurrentUser();
  if(!loggedInUser) return;
      this.userService.getUserById(loggedInUser.id).subscribe(user => {
        this.currentUser.set(user);
        this.authService.setCurrentUser(user);
        console.log('Data Refreshed');
    });
  }

  fetchUserOrders(){
    const loggedInUser = this.authService.getCurrentUser();
    if(!loggedInUser) return;
      this.orderService.getOrdersByUserId(loggedInUser.id).subscribe({
        next:(orders) => {
          this.userOrders.set(orders);
          console.log('Orders refreshed');
        }
      })
  }
}

