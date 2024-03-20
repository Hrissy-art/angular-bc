import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrl: './order-search.component.css',
})
export class OrderSearchComponent implements OnInit {
  orders: Order[] | undefined;
  filteredOrders: Order[] | undefined;

  statusOptions = [
    { label: 'En attente', value: '/api/status_orders/1' },
    { label: 'En cours', value: '/api/status_orders/2' },
    { label: 'Terminée', value: '/api/status_orders/3' },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
    console.log(this.orders);
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data['hydra:member'];
    });
  }

  getStatusLabel(statusValue: string): string {
    const statusOption = this.statusOptions.find(
      (option) => option.value === statusValue
    );
    return statusOption ? statusOption.label : 'Unknown';
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Order } from '../models/order';
// import { OrderService } from '../services/order.service';

// @Component({
//   selector: 'app-order-search',
//   templateUrl: './order-search.component.html',
//   styleUrls: ['./order-search.component.css'],
// })
// export class OrderSearchComponent implements OnInit {
//   orders: Order[] = [];
//   filteredOrders: Order[] = [];
//   searchNumber: number | undefined;

//   constructor(private orderService: OrderService) {}

//   ngOnInit(): void {
//     this.loadOrders();
//   }

//   loadOrders(): void {
//     this.orderService.getAllOrders().subscribe((data: Order[]) => {
//       this.orders = data;
//     });
//   }

//   searchOrdersByNumber(): void {
//     if (this.searchNumber !== undefined) {
//       if (Array.isArray(this.orders)) {
//         this.filteredOrders = this.orders.filter(
//           (order) => order.numberOrder === this.searchNumber
//         );
//       } else {
//         console.error('Orders is not an array.');
//         this.filteredOrders = [];
//       }
//     } else {
//       this.filteredOrders = [];
//     }
//   }
// }