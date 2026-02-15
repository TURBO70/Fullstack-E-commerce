import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductForm } from '../../models/productForm_model';
import { Category } from '../../models/category_model';
import { CategoryService } from '../../core/services/category_service';

@Component({
  selector: 'app-add-product-modal',
  imports: [FormsModule],
  templateUrl: './add-product-modal.html',
  styles: ``,
})
export class AddProductModal {
  categories = signal<Category[]>([]);
  imageValid = true;

  @Input() open = false;
  @Input() product: ProductForm | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProductForm>();

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
    if (!this.product) return;   // ✅ guard
    this.save.emit(this.product); // ✅ emits ProductForm only
  }

  checkImage(url: string) {
    const img = new Image();
    img.onload = () => this.imageValid = true;
    img.onerror = () => this.imageValid = false;
    img.src = url;
  }

  get isFormValid(): boolean {
    if (!this.product) return false;

    return !!(
      this.product.name?.trim() &&
      this.product.description?.trim() &&
      this.product.price > 0 &&
      (this.product.originalPrice ?? 0) > 0 &&
      this.product.stock >= 0 &&
      this.product.categoryId &&
      this.product.image &&
      this.imageValid
    );
  }



}
