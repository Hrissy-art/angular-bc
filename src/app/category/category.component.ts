import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryProducts: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoriesWithProducts().subscribe((categories) => {
      this.categories = categories;
    });
  }

  showProducts(category: Category): void {
    // Mettez à jour les produits sélectionnés en fonction de la catégorie cliquée
    this.selectedCategoryProducts = category.products ? category.products : [];
  }
}
