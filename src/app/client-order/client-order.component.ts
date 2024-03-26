import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrl: './client-order.component.css',
})
export class ClientOrderComponent implements OnInit {
  desiredNumber: number = 10;

  orders!: Order[];
  selectedOrder!: Order | null;
  selectedOrderNumber: number = 0; // Numéro de commande sélectionné
  selectionOrder: Order | null | undefined = undefined; // Commande filtrée
  numberOrder?: number;
  allOrders: Order[] = []; // Liste de toutes les commandes

  // @Output() orderSelected = new EventEmitter<number>();

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
  CloseDetails(): void {
    this.selectedOrder = null;
    console.log('Bouton cliqué');
  }

  // onSelectOrder(order: Order): void {
  //   this.selectedOrder = order;
  //   console.log('Order selected:', this.selectedOrder);
  // }
  onSelectOrder(order: Order): void {
    this.selectedOrder = order;
    localStorage.setItem('selectedOrderId', order.id.toString());
  }

  filterOrder(): void {
    this.selectionOrder = this.allOrders.find(
      (order) => order.numberOrder === this.selectedOrderNumber
    );
  }
  filterCondition(order: Order): boolean {
    return order.numberOrder === this.desiredNumber;
  }
}
