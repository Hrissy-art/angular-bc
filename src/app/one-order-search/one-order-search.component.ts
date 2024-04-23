import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { StatusService } from '../services/status.service';
import { StatusOrder } from '../models/statusOrder';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-one-order-search',
  templateUrl: './one-order-search.component.html',
  styleUrl: './one-order-search.component.css',
})
export class OneOrderSearchComponent {
  selectedOrder: Order | undefined;
  selectedOrderId?: number;
  statusesOptions: { '@id': string; status: string }[] = [];

  selectedStatus: string = '';
  successMessageNewStatus: string | null = null;

  @Input() order!: Order | null;
  @Output() closeDetails = new EventEmitter<void>();

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private app: AppComponent
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    const selectedOrderId = localStorage.getItem('selectedOrderId');
    if (selectedOrderId) {
      this.getOrder(+selectedOrderId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedOrderId);
    }

    this.loadStatusOptions();
  }

  loadStatusOptions(): void {
    this.statusService
      .getStatus(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.statusesOptions = data['hydra:member'];
      });
  }

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
        this.successMessageNewStatus =
          'Le statut de la commande a été mis à jour avec succès';
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
    const employeeId = this.selectedOrder.employee
      ? this.selectedOrder.employee['@id']
      : '';

    const orderData = {
      dateOrder: this.selectedOrder.dateOrder,
      dateRender: this.selectedOrder.dateRender,
      numberOrder: this.selectedOrder.numberOrder,
      client: clientId,
      statusOrder: this.selectedStatus,
      employee: employeeId,
    };
    console.log('Données de commande à envoyer :', orderData);

    this.updateOrderStatus(orderId, orderData);
  }
}
