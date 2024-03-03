import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../models/orderProduct';
import { OrderProductService } from '../services/order-product.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css'
})
export class OrderProductComponent implements OnInit {

    orderProduct: OrderProduct | undefined;
  
    constructor(private orderProductService: OrderProductService) { }
  
    ngOnInit(): void {
      this.getOrderProduct(1); // Supposons que vous voulez récupérer l'OrderProduct avec l'ID 1
    }
  
    getOrderProduct(id: number): void {
      this.orderProductService.getOrderProduct(id)
        .subscribe(
          orderProduct => {
            this.orderProduct = orderProduct;
            console.log('Order Product:', this.orderProduct);
            console.log('Statut de la commande:', this.orderProduct.statusOrder);
          },
          error => {
            console.error('Erreur:', error);
          }
        );
    }
  }