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
    const loggedInUser = this.authService.getCurrentUser();
    if(loggedInUser){
      this.currentUser.set(loggedInUser);
      console.log('Logged in user:', loggedInUser);

      this.orderService.getOrdersByUserId(loggedInUser.id).subscribe(orders =>{
      this.userOrders.set(orders);
      console.log('User orders:', orders);
    });
  }
}

  // fetchUserData(){

  // }
  //   this.userService.getUserById('2').subscribe(user => {
  //     this.currentUser.set(user);
  //     console.log('Parent got user:', user);
  //   });
  //   this.orderService.getOrdersByUserId('2').subscribe(orders => {
  //     this.userOrders.set(orders);
  //     console.log('Parent got orders:', orders);
  //   });
  // }
// fetchUserData() {
// const loggedInUser = this.authService.getCurrentUser();
    
//     if (loggedInUser) {
//       this.userService.getUserById(loggedInUser.id).subscribe(user => {
//         this.currentUser.set(user);
//         this.authService.setCurrentUser(user);
//         console.log('Data Refreshed!');
//     });
//     }
//   }
}

