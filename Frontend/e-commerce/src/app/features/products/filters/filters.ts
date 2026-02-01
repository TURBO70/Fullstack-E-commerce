import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector:  'app-filters',
  imports: [FormsModule, CommonModule],
  templateUrl: './filters.html',
})
export class Filters {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = '';
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}

