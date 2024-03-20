import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../models/orderProduct';
import { OrderProductService } from '../services/order-product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css',
})
export class OrderProductComponent implements OnInit {
  orderProduct: OrderProduct | undefined;
  subscription: Subscription | undefined;
  product_name: any;

  constructor(private orderProductService: OrderProductService) {}

  ngOnInit(): void {
    this.getOrderProduct(); // Supposons que vous voulez récupérer l'OrderProduct avec l'ID 1
  }

  getOrderProduct(): void {
    this.subscription = this.orderProductService.getOrderProduct(3).subscribe({
      next: (orderProduct: OrderProduct) => {
        this.orderProduct = orderProduct;
        console.log('Order Product:', this.orderProduct);
        // console.log('Statut de la commande:', this.orderProduct.statusOrders);
      },
      error: (error: any) => {
        console.error('Erreur:', error);
      },
    });
  }
}

// // product-order.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ApiService } from './api.service';
// import { Service } from './models/service';
// import { Material } from './models/material';
// import { OrderProduct } from './models/order_products';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-product-order',
//   templateUrl: './product-order.component.html',
//   styleUrls: ['./product-order.component.css']
// })
// export class OrderProductComponent implements OnInit {
//   selectedService: number | undefined;
//   selectedMaterial: number | undefined;
//   services: Service[] = [];
//   materials: Material[] = [];

//   constructor(private apiService: ApiService, private cartService: CartService) { }

//   ngOnInit(): void {
//     this.apiService.getServices().subscribe(services => {
//       this.services = services;
//     });
//     this.apiService.getMaterials().subscribe(materials => {
//       this.materials = materials;
//     });
//   }

//   order(): void {
//     if (this.selectedService && this.selectedMaterial) {
//       const productOrder: OrderProduct = {
//         serviceId: this.selectedService,
//         materialId: this.selectedMaterial
//       };
//       this.apiService.createProductOrder(productOrder).subscribe(order => {
//         this.cartService.clearCart();
//         console.log('Commande effectuée :', order);
//       });
//     } else {
//       console.error('Veuillez sélectionner un service et une matière.');
//     }
//   }
// }
