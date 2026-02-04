import { Component, signal } from '@angular/core';
import { user } from '../../models/user_model';
import { UserService } from '../../core/services/user_service';

@Component({
  selector: 'app-dashboard-users-list',
  imports: [],
  templateUrl: './dashboard-users-list.html',
  styles: ``,
})
export class DashboardUsersList {
  users = signal<user[]>([]);

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
