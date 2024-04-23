import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product!: Product | null;
  @Output() closeDetails = new EventEmitter<void>();

  // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  CloseDetails(): void {
    this.closeDetails.emit();
  }
}
