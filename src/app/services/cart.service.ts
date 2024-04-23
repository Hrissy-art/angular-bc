import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  selectedServices: Service[] = [];
  selectedMaterials: Material[] = [];

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
    this.selectedServices.push(...services);
  }

  getSelectedServices(): Service[] {
    return this.selectedServices;
  }

  removeServicesFromCart(): void {
    this.selectedServices = [];
  }

  addMaterialsToCart(materials: Material[]): void {
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
