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

  selectedStatus: string = ''; // to store the selected status
  statusOptions = [
    { label: 'En attente', value: '/api/status_orders/1' },
    { label: 'En cours', value: '/api/status_orders/2' },
    { label: 'Terminée', value: '/api/status_orders/3' },
  ];

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

  updateOrderStatus(orderId: number, orderData: any): void {
    this.orderService.updateOrderStatus(orderId, orderData).subscribe(
      () => {
        console.log('Le statut de la commande a été mis à jour avec succès');
      },
      (error) => {
        console.error(
          'Échec de la mise à jour du statut de la commande :',
          error
        );
      }
    );
  }

  updateOrder(): void {
    const orderId = 1; // Remplacez par l'ID de la commande que vous souhaitez mettre à jour
    const orderData = {
      dateOrder: '2024-03-03T04:13:43+00:00',
      dateRender: '2024-03-20T00:00:00+00:00',
      client: '/api/clients/2',
      statusOrder: '/api/status_orders/2',
    };

    this.updateOrderStatus(orderId, orderData);
  }
}
