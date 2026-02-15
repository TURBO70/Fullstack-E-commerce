import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/product_model';
import { ProductService } from '../../core/services/product_service';
import { Category } from '../../models/category_model';
import { CategoryService } from '../../core/services/category_service';
import { FormsModule } from '@angular/forms';
import { AddProductModal } from "../add-product-modal/add-product-modal";
import { ProductForm } from '../../models/productForm_model';

@Component({
  selector: 'app-dashboard-products-list',
  imports: [FormsModule, AddProductModal],
  templateUrl: './dashboard-products-list.html',
  styles: ``,
})
export class DashboardProductsList {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  editedProduct: Product | null = null;
  deletedProduct: Product | null = null;
  selectedProduct: ProductForm | null = null;
  showModal = false;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products-list:', err);
      }
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories-list:', err);
      }
    });
  }

  productsWithCategory = computed(() => {
    const products = this.products()
    const categories = this.categories();

    const categoryMap = new Map(
      categories.map(c => [c.id, c.name])
    );

    return products.map(p => ({
      ...p,
      categoryName: categoryMap.get(p.categoryId) ?? 'Unknown'
    }));
  });

  editProduct(product: Product) {
    this.editedProduct = { ...product };;
  }

  deleteProduct(product: Product) {
    this.deletedProduct = product;
  }

  fireDeleteProduct(product: Product) {
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.products.set(this.products().filter(p => p.id !== product.id));
        this.deletedProduct = null;
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }

  saveProduct(product: Product) {
    this.productService.update(this.editedProduct!.id, product).subscribe({
      next: (updatedProduct) => {
        const index = this.products().findIndex(p => p.id === updatedProduct.id);
        const products = [...this.products()];
        products[index] = updatedProduct;
        this.products.set(products);
        this.editedProduct = null;
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

  cancelEdit() {
    this.editedProduct = null;
    this.deletedProduct = null;
  }


  openAddModal() {
    this.selectedProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      categoryId: '',
      stock: 0,
      unit: '',
      isOrganic: false,
      isFeatured: false,
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  handleSave(form: ProductForm) {
    const newProduct: Omit<Product, 'id'> = {
      // id will be set by backend
      name: form.name,
      description: form.description,
      price: form.price,
      originalPrice: form.originalPrice,
      image: form.image,
      categoryId: form.categoryId,
      stock: form.stock,
      unit: form.unit,
      isOrganic: form.isOrganic,
      isFeatured: form.isFeatured,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0,
    };
    this.productService.add(newProduct).subscribe({
      next: (created) => {
        this.products.set([...this.products(), created]);
      },
      error: err => console.error(err)
    });

    this.closeModal();
  }
}