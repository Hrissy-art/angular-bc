// import { Component, OnInit } from '@angular/core';
// import { OrderProduct } from '../models/orderProduct';
// import { OrderProductService } from '../services/order-product.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-order-product',
//   templateUrl: './order-product.component.html',
//   styleUrl: './order-product.component.css',
// })
// export class OrderProductComponent implements OnInit {
//   orderProduct: OrderProduct | undefined;
//   subscription: Subscription | undefined;
//   product_name: any;

//   constructor(private orderProductService: OrderProductService) {}

//   ngOnInit(): void {
//     this.getOrderProduct(); // Supposons que vous voulez récupérer l'OrderProduct avec l'ID 1
//   }

//   getOrderProduct(): void {
//     this.subscription = this.orderProductService.getOrderProduct(3).subscribe({
//       next: (orderProduct: OrderProduct) => {
//         this.orderProduct = orderProduct;
//         console.log('Order Product:', this.orderProduct);
//         // console.log('Statut de la commande:', this.orderProduct.statusOrders);
//       },
//       error: (error: any) => {
//         console.error('Erreur:', error);
//       },
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../models/orderProduct';
import { OrderProductService } from '../services/order-product.service';
import { Subscription } from 'rxjs';
import { Service } from '../models/service';
import { Material } from '../models/material';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css'], // Utilisation de styleUrls au lieu de styleUrl
})
export class OrderProductComponent implements OnInit {
  orderProducts: OrderProduct[] = [];
  subscription: Subscription | undefined;
  services: Service[] = [];
  materials: Material[] = [];

  constructor(
    private orderProductService: OrderProductService,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.getAllOrderProducts(); // Appel de la méthode pour récupérer tous les ordres de produits
  }

  getAllOrderProducts(): void {
    this.subscription = this.orderProductService
      .getAllOrderProducts(this.app.createCorsToken())
      .subscribe({
        next: (data: any) => {
          this.orderProducts = data['hydra:member'];
          console.log('All Order Products:', this.orderProducts);
        },
        error: (error: any) => {
          console.error('Error:', error);
        },
      });
  }
}
