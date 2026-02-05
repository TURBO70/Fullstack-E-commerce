import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Category } from '../../models/category_model';
import { CategoryService } from '../../core/services/category_service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category-modal',
  imports: [FormsModule],
  templateUrl: './add-category-modal.html',
  styles: ``,
})
export class AddCategoryModal {
  categories = signal<Category[]>([]);

  @Input() open = false;
  @Input() category: Category | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories-list:', err);
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (!this.category) return;   // ✅ guard
    this.save.emit(this.category); // ✅ emits Category only
  }
}
