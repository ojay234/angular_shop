import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$: any;
  @Input('category') category: any;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
  }
}
