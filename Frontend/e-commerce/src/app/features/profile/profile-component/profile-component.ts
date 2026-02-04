import { Component, effect, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core'; // Import signal
import { CommonModule } from '@angular/common';
import { user } from '../../../shared/models/user_model';
import { UserService } from '../../../core/services/user_service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, ReactiveFormsModule],
    standalone: true,
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent implements OnInit {

  @Input() currentUser!: Signal<user | null>;
  @Output() profileUpdated = new EventEmitter<void>();

  isEditing = signal(false);
  userForm!: FormGroup;

    constructor(private userService: UserService, private fb: FormBuilder) {
          effect(() => {
      const user = this.currentUser();
      if (user) {
        this.userForm.patchValue(user);
      }
    });
    }

  ngOnInit() {
    this.userForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    city: ['',Validators.required]
    });
  }

    toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

    save() {
    if (this.userForm.invalid) return;

    const userId = this.currentUser()?.id!;
    this.userService.updateUserData(userId, this.userForm.value)
      .subscribe(() => {
        this.isEditing.set(false);
        this.profileUpdated.emit();
      });
  }
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
}