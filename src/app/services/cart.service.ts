// import { Injectable } from '@angular/core';
// import { Product } from '../models/products';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Service } from '../models/service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   cart: Product[] = [];
//   selectedServices: Service[] = [];

//   constructor(private http: HttpClient) {}

//   addToCart(product: Product): void {
//     this.cart.push(product);
//   }

//   getCart(): Product[] {
//     return this.cart;
//   }

//   removeFromCart(index: number): void {
//     this.cart.splice(index, 1);
//   }
//   addServicesToCart(services: Service[]): void {
//     // Ajoutez votre logique pour ajouter les services au panier
//     this.selectedServices.push(...services);
//   }
//   getSelectedServices(): Service[] {
//     return this.selectedServices;
//   }
//   removeServicesFromCart(): void {
//     this.selectedServices = [];
//   }
// }
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service';
import { Material } from '../models/material'; // Importez le modèle Material ici

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  selectedServices: Service[] = [];
  selectedMaterials: Material[] = []; // Ajoutez une propriété pour stocker les matériaux sélectionnés

  constructor(private http: HttpClient) {}

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Product[] {
    return this.cart;
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  addServicesToCart(services: Service[]): void {
    // Ajoutez votre logique pour ajouter les services au panier
    this.selectedServices.push(...services);
  }

  getSelectedServices(): Service[] {
    return this.selectedServices;
  }

  removeServicesFromCart(): void {
    this.selectedServices = [];
  }

  addMaterialsToCart(materials: Material[]): void {
    // Ajoutez votre logique pour ajouter les matériaux au panier
    this.selectedMaterials.push(...materials);
  }

  getSelectedMaterials(): Material[] {
    return this.selectedMaterials;
  }

  removeMaterialsFromCart(): void {
    this.selectedMaterials = [];
  }

  isCartFull(): boolean {
    return this.cart.length >= 1;
  }
}
