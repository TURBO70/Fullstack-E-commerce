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
  imageValid = true;

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

  checkImage(url: string) {
    const img = new Image();
    img.onload = () => this.imageValid = true;
    img.onerror = () => this.imageValid = false;
    img.src = url;
  }

  get isFormValid(): boolean {
    if (!this.category) return false;

    return !!(
      this.category.name?.trim() &&
      this.category.description?.trim() &&
      this.category.slug?.trim() &&
      this.category.productCount > 0 &&
      this.category.image &&
      this.imageValid
    );
  }
}
