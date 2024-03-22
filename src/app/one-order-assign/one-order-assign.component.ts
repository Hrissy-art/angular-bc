import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-order-assign',
  templateUrl: './one-order-assign.component.html',
  styleUrl: './one-order-assign.component.css',
})
export class OneOrderAssignComponent {
  selectedOrder: Order | undefined;
  selectedOrderId?: number;

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

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.selectedOrderId = +params['id']; // Convertir l'ID en nombre
  //     this.getOrder(this.selectedOrderId);
  //   });
  // }
  ngOnInit(): void {
    const selectedOrderId = localStorage.getItem('selectedOrderId');
    if (selectedOrderId) {
      this.getOrder(+selectedOrderId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedOrderId);
    }
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
    if (!this.selectedOrder || isNaN(this.selectedOrder.id)) {
      console.error('Aucune commande sélectionnée ou ID de commande invalide.');
      return;
    }

    const orderId = this.selectedOrder.id;
    const clientId = this.selectedOrder.client['@id'];
    const orderData = {
      dateOrder: this.selectedOrder.dateOrder, // Utilisez les données actuelles
      dateRender: this.selectedOrder.dateRender, // Utilisez les données actuelles
      client: clientId,
      statusOrder: this.selectedStatus, // Utilisez le statut sélectionné
      // Ajoutez d'autres champs nécessaires ici
    };
    console.log('Données de commande à envoyer :', orderData);

    this.updateOrderStatus(orderId, orderData);
  }
}
