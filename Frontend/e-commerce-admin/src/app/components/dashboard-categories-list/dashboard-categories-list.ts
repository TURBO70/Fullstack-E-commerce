  import { Component, signal } from '@angular/core';
  import { CategoryService } from '../../core/services/category_service';
  import { Category } from '../../models/category_model';
  import { FormsModule } from '@angular/forms';
  import { AddCategoryModal } from "../add-category-modal/add-category-modal";

  @Component({
    selector: 'app-dashboard-categories-list',
    imports: [FormsModule, AddCategoryModal],
    templateUrl: './dashboard-categories-list.html',
    styles: ``,
  })
  export class DashboardCategoriesList {

    categories = signal<Category[]>([]);
    editedCategory: Category | null = null;
    deletedCategory: Category | null = null;
    selectedCategory: Category | null = null;
    showModal = false;

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

    editCategory(category: Category) {
      this.editedCategory = { ...category };
    }

    saveUpdateCategory(category: Category) {
      if (!this.editedCategory) return;

      this.categoryService.update(this.editedCategory.id, category).subscribe({
        next: (updated) => {
          const index = this.categories().findIndex(c => c.id === updated.id);
          const categories = [...this.categories()];
          categories[index] = updated;
          this.categories.set(categories);
          this.editedCategory = null;
        },
        error: (err) => {
          console.error('Error updating category:', err);
        }
      });
    }


    deleteCategory(category: Category) {
      this.deletedCategory = category;
    }

    fireDeleteCategory(category: Category) {
      this.categoryService.delete(category.id).subscribe({
        next: () => {
          this.categories.set(this.categories().filter(c => c.id !== category.id));
          this.deletedCategory = null;
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }

    cancelEdit() {
      this.editedCategory = null;
      this.deletedCategory = null;
    }

    openAddModal() {
        this.selectedCategory = {
          id: '',
          name: '',
          description: '',
          image: '',
          productCount: 0,
          slug: '',
        };
        this.showModal = true;
      }
    
      closeModal() {
        this.showModal = false;
        this.selectedCategory = null;
      }
    
      handleSave(form: Category) {
        const newCategory: Omit<Category, 'id'> = {
          // id will be set by backend
          name: form.name,
          description: form.description,
          image: form.image,
          slug: form.slug,
          productCount: form.productCount,
        };
        this.categoryService.add(newCategory).subscribe({
          next: (created) => {
            this.categories.set([...this.categories(), created]);
          },
          error: err => console.error(err)
        });
    
        this.closeModal();
      }
  }
