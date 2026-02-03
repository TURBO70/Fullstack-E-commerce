import { Component, Input, OnInit, Signal, signal } from '@angular/core'; // Import signal
import { CommonModule } from '@angular/common';
import { user } from '../../../shared/models/user_model';
import { UserService } from '../../../core/services/user_service';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent{
  // 1. Initialize as a signal
  // currentUser = signal<user | undefined>(undefined);
  // activeTab = signal<'profile' | 'orders'>('profile');

  // constructor(private userService: UserService) { }

  // ngOnInit() {
  //   this.userService.getUserById("1").subscribe({
  //     next: (data) => {
  //       // 2. Use .set() to update the signal value
  //       this.currentUser.set(data);
  //       console.log('Signal updated with:', data);
  //     },
  //     error: (err) => console.error('Service Error:', err)
  //   });
  // }

  // setTab(tab: 'profile' | 'orders') {
  //   this.activeTab.set(tab);
  // }
  
  @Input() currentUser!: Signal<user | null>;
  
}