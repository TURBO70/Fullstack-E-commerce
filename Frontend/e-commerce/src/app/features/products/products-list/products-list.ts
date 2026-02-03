import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product_model';
import { ProductService } from '../../../core/services/product_service';
import { ProductsGrid } from '../products-grid/products-grid';
import { Filters } from '../filters/filters';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../shared/models/category_model';
import { CategoryService } from '../../../core/services/category_service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  imports: [ProductsGrid, Filters, FormsModule, CommonModule, ProductCard],

  templateUrl: './products-list.html',
})
export class ProductsList {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: Category[] = [];

  // Filters
  searchQuery: string = '';
  selectedCategory: string = 'all';
  showOrganic: boolean = false;
  priceRange: [number, number] = [0, 50];
  sortBy: string = 'featured';

  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = [...data];
    });

    this.categoryService.getAll().subscribe((cats: Category[]) => {
      this.categories = cats;
    });
  }

  filterProducts() {
    let result = [...this.products];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      );
    }

    if (this.selectedCategory && this.selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId.toString() === this.selectedCategory);
    }

    if (this.showOrganic) {
      result = result.filter((p) => p.isOrganic);
    }

    result = result.filter((p) => p.price >= this.priceRange[0] && p.price <= this.priceRange[1]);

    switch (this.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    this.filteredProducts = result;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.showOrganic = false;
    this.priceRange = [0, 50];
    this.sortBy = 'featured';
    this.filterProducts();
  }

  activeFiltersCount(): number {
    return [this.searchQuery, this.selectedCategory !== 'all', this.showOrganic].filter(Boolean)
      .length;
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
