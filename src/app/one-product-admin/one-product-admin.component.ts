import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Prod } from '../models/productCreate';
import { CategoryService } from '../services/category.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-one-product-admin',
  templateUrl: './one-product-admin.component.html',
  styleUrl: './one-product-admin.component.css',
})
export class OneProductAdminComponent {
  selectedProduct: Product | undefined;
  selectedProductId?: number;
  categories: Category[] = [];
  successMessageUpdate: string | null = null;

  newProduct: Prod = {
    productName: '',
    price: 0,
    description: '',
    productImg: '',
  };
  categoriesOptions: { '@id': string; category_name: string }[] = [];
  selectedCategorie: string = '';

  @Input() product!: Product | null;
  @Output() closeDetails = new EventEmitter<void>();
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categorieService: CategoryService,
    private app: AppComponent
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }
  ngOnInit(): void {
    this.loadECategorieOptions();
  }
  CloseDetails(): void {
    this.closeDetails.emit();
  }

  // updateProductDetails(): void {
  //   if (this.product) {
  //     console.log('Données du produit avant la mise à jour :', this.product);
  //     const options = { headers: new HttpHeaders() }; // Ajoutez vos en-têtes personnalisés ici si nécessaire
  //     this.productService
  //       .updateProduct(this.product.id, this.product, options)
  //       .subscribe(
  //         (updatedProduct: Product) => {
  //           console.log(
  //             'Détails du produit mis à jour avec succès :',
  //             updatedProduct
  //           );
  //           // Vous pouvez ajouter ici une logique pour traiter la réponse mise à jour si nécessaire
  //         },
  //         (error) => {
  //           console.error(
  //             'Échec de la mise à jour des détails du produit :',
  //             error
  //           );
  //           // Gestion des erreurs de mise à jour du produit
  //         }
  //       );
  //   }
  // }
  loadECategorieOptions(): void {
    this.categorieService.getCategories().subscribe(
      (data: any[]) => {
        // Vérifiez si les données renvoyées sont un tableau
        if (Array.isArray(data)) {
          this.categoriesOptions = data;
          console.log('Categories récupérés:', this.categoriesOptions);
        } else {
          console.error('Les données reçues ne sont pas un tableau.');
        }
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des catégories :",
          error
        );
      }
    );
  }

  updateProductDetails(): void {
    if (this.product) {
      console.log('Données du produit avant la mise à jour :', this.product);
      const options = { headers: new HttpHeaders() };
      const updatedProduct: any = {
        id: this.product.id,
        product_name: this.product.product_name,
        price: this.product.price,
        description: this.product.description,
        product_img: this.product.product_img,
        category: this.selectedCategorie,
      };

      // Vérification de l'existence de la catégorie et de son @id
      // const categoryId = this.product.category?.['@id'];

      // if (categoryId) {
      //   updatedProduct.category = categoryId;
      // }

      this.productService
        .updateProduct(this.product.id, updatedProduct, options)
        .subscribe(
          (updatedProduct: any) => {
            console.log(
              'Détails du produit mis à jour avec succès :',
              updatedProduct
            );
            this.successMessageUpdate =
              'Le produit a été mis à jour avec succès';
          },
          (error) => {
            console.error(
              'Échec de la mise à jour des détails du produit :',
              error
            );
            // Gestion des erreurs de mise à jour du produit
          }
        );
    }
  }

  createProduct(): void {
    const options = { headers: new HttpHeaders() }; // Vous pouvez ajouter des en-têtes personnalisés ici si nécessaire

    console.log(
      'Données du nouveau produit avant la création :',
      this.newProduct
    );

    this.productService.addProduct(this.newProduct, options).subscribe(
      (createdProduct: Prod) => {
        console.log('Nouveau produit créé avec succès :', createdProduct);
        // Mettre à jour l'ID du nouveau produit avec celui renvoyé par le backend
        this.newProduct.id = createdProduct.id;
      },
      (error) => {
        console.error('Erreur lors de la création du produit :', error);
        // Gérer les erreurs de création de produit
      }
    );
  }
}
