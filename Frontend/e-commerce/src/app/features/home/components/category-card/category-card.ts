import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
  constructor(private router: Router) {}
  @Input() src = '';
  @Input() productCounts = 0;
  @Input() name = '';
  @Input() id = '';

  clickCategory(id: string) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }
}
