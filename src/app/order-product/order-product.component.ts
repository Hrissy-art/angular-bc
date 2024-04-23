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
  styleUrls: ['./order-product.component.css'],
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
    this.getAllOrderProducts();
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
