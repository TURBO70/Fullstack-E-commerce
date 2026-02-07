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

countries = [
  {
    name: 'Egypt',
    cities: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said', 'Suez', 'Mansoura']
  },
  {
    name: 'Saudi Arabia',
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 'Abha']
  },
  {
    name: 'UAE',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
  },
  {
    name: 'Kuwait',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Sabah Al Salem', 'Jahra', 'Ahmadi']
  },
  {
    name: 'Qatar',
    cities: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Umm Salal', 'Al Khor', 'Dukhan']
  },
  // {
  //   name: 'Bahrain',
  //   cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
  // },
  // {
  //   name: 'Oman',
  //   cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka']
  // },
  // {
  //   name: 'Jordan',
  //   cities: ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Petra', 'Madaba', 'Jerash']
  // },
  {
    name: 'Lebanon',
    cities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos', 'Zahle', 'Baalbek']
  },
  // {
  //   name: 'Iraq',
  //   cities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf', 'Karbala', 'Sulaymaniyah']
  // },
  // {
  //   name: 'Syria',
  //   cities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama', 'Tartus']
  // },
  {
    name: 'Morocco',
    cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 'Agadir', 'Meknes']
  },
  {
    name: 'Algeria',
    cities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Setif']
  },
  {
    name: 'Tunisia',
    cities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabes', 'Monastir']
  },
  // {
  //   name: 'USA',
  //   cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio']
  // }
];

  cities:string[] = [];

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
    name: ['', 
      [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/) // Only letters and spaces
      ]
    ],
    email: [      '', 
      [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]
    ],
    city: ['',Validators.required],
    country:['',Validators.required],
    });

  }
  getErrorMessage(fieldName: string): string {
  const control = this.userForm.get(fieldName);
  
  if (control?.hasError('required')) {
    return `${this.getFieldLabel(fieldName)} is required`;
  }
  
  if (control?.hasError('email')) {
    return 'Please enter a valid email address';
  }
  
  if (control?.hasError('minlength')) {
    const minLength = control.errors?.['minlength'].requiredLength;
    return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
  }
  
  if (control?.hasError('maxlength')) {
    const maxLength = control.errors?.['maxlength'].requiredLength;
    return `${this.getFieldLabel(fieldName)} must not exceed ${maxLength} characters`;
  }
  
  if (control?.hasError('pattern')) {
    if (fieldName === 'name') {
      return 'Name can only contain letters and spaces';
    }
    if (fieldName === 'email') {
      return 'Please enter a valid email address';
    }
  }
  
  return '';
}

getFieldLabel(fieldName: string): string {
  const labels: { [key: string]: string } = {
    name: 'Name',
    email: 'Email',
    country: 'Country',
    city: 'City'
  };
  return labels[fieldName] || fieldName;
}

isFieldInvalid(fieldName: string): boolean {
  const control = this.userForm.get(fieldName);
  return !!(control && control.invalid && (control.dirty || control.touched));
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

    onCountryChange() {
    const selectedCountry = this.userForm.get('country')?.value;

    const countryObj = this.countries.find(
      c => c.name === selectedCountry
    );

     this.cities = countryObj ? countryObj.cities : [];

    // reset city when country changes
    this.userForm.get('city')?.setValue('');
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

