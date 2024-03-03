// product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
  selectedProduct: Product | undefined;
  selectedProductId: number | undefined;
  // selectedProducId: number=5;

  // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
  constructor(private productService: ProductService, private route: ActivatedRoute,) {
    // this.getProduct(<number>this.selectedProductId);

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedProductId = +params['id']; // Convertir l'ID en nombre
      this.getProduct(this.selectedProductId);
    });
  }

  // ngOnInit(): void {
  //   this.productService.getProducts({ headers: new HttpHeaders() })
  //     .subscribe((data: any) => {
  //       this.products = data['hydra:member'];
  //       console.table(this.products);
  //     });
  // }

  // Méthode pour récupérer un seul produit en fonction de son ID en utilisant le nouveau service
  getProduct(productId: number): void {
    this.productService.getProduct(productId, { headers: new HttpHeaders() })
      .subscribe((product: Product) => {
        this.selectedProduct = product;
        console.log(this.selectedProduct);
      });
  }
}
