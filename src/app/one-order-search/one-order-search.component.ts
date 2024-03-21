import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-order-search',
  templateUrl: './one-order-search.component.html',
  styleUrl: './one-order-search.component.css',
})
export class OneOrderSearchComponent {
  selectedOrder: Order | undefined;
  selectedOrderId: number | undefined;

  @Input() order!: Order | null;
  @Output() closeDetails = new EventEmitter<void>();
  // selectedProducId: number=5;

  // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedOrderId = +params['id']; // Convertir l'ID en nombre
      this.getOrder(this.selectedOrderId);
    });
  }

  // Méthode pour récupérer un seul order en fonction de son ID en utilisant le nouveau service
  getOrder(orderId: number): void {
    this.orderService
      .getOneOrder(orderId, { headers: new HttpHeaders() })
      .subscribe((order: Order) => {
        this.selectedOrder = order;
        console.log(this.selectedOrder);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }
}
