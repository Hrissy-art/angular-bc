// import { Component, OnInit } from '@angular/core';
// import { Product } from '../models/products';
// import { CartService } from '../services/cart.service';
// import { Service } from '../models/service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css',
// })
// export class CartComponent implements OnInit {
//   cart: Product[] = [];
//   selectedServices: Service[] = [];

//   constructor(private cartService: CartService, private router: Router) {}

//   ngOnInit(): void {
//     this.cart = this.cartService.getCart();
//     this.selectedServices = this.cartService.getSelectedServices(); // Récupérer les services sélectionnés
//   }

//   removeFromCart(index: number): void {
//     this.cartService.removeFromCart(index);
//     this.cart = this.cartService.getCart(); // Mettez à jour le panier après la suppression d'un produit
//   }
//   getTotalPrice(): number {
//     let totalPrice = 0;

//     // Ajouter le prix des produits au total
//     totalPrice += this.cart.reduce(
//       (total, product) => total + product.price,
//       0
//     );

//     // Ajouter le prix des services au total
//     totalPrice += this.selectedServices.reduce(
//       (total, service) => total + service.coeff,
//       0
//     );

//     return totalPrice;
//   }
//   removeSelectedServices(): void {
//     // Supprimer les services sélectionnés du panier
//     this.cartService.removeServicesFromCart();
//     // Réinitialiser la liste des services sélectionnés
//     this.selectedServices = [];
//   }

//   // Méthode pour valider le panier et naviguer vers une autre page
//   validateCart(): void {
//     // Après avoir validé, vous pouvez naviguer vers une autre page
//     this.router.navigate(['/orderDate']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { CartService } from '../services/cart.service';
import { Service } from '../models/service';
import { Material } from '../models/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  selectedServices: Service[] = [];
  selectedMaterials: Material[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.selectedServices = this.cartService.getSelectedServices(); // Récupérer les services sélectionnés
    this.selectedMaterials = this.cartService.getSelectedMaterials(); // Récupérer les matériaux sélectionnés
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); // Mettez à jour le panier après la suppression d'un produit
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    // Ajouter le prix des produits au total
    totalPrice += this.cart.reduce(
      (total, product) => total + product.price,
      0
    );

    // Ajouter le prix des services au total
    totalPrice += this.selectedServices.reduce(
      (total, service) => total + service.coeff,
      0
    );

    // Ajouter le prix des matériaux au total
    totalPrice += this.selectedMaterials.reduce(
      (total, material) => total + material.coeff,
      0
    );

    return totalPrice;
  }

  removeSelectedServices(): void {
    // Supprimer les services sélectionnés du panier
    this.cartService.removeServicesFromCart();
    // Réinitialiser la liste des services sélectionnés
    this.selectedServices = [];
  }

  removeSelectedMaterials(): void {
    // Supprimer les matériaux sélectionnés du panier
    this.cartService.removeMaterialsFromCart();
    // Réinitialiser la liste des matériaux sélectionnés
    this.selectedMaterials = [];
  }

  // Méthode pour valider le panier et naviguer vers une autre page
  validateCart(): void {
    // Après avoir validé, vous pouvez naviguer vers une autre page
    this.router.navigate(['/orderDate']);
  }
}
