import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-assign',
  templateUrl: './order-assign.component.html',
  styleUrl: './order-assign.component.css',
})
export class OrderAssignComponent implements OnInit {
  orders!: Order[];
  selectedOrder!: Order | null;

  @Output() orderSelected = new EventEmitter<number>();

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

  onSelectOrder(order: Order): void {
    this.selectedOrder = order;
    localStorage.setItem('selectedOrderId', order.id.toString());
  }
}
