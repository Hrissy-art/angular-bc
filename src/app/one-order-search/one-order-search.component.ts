// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Order } from '../models/order';
// import { OrderService } from '../services/order.service';
// import { ActivatedRoute } from '@angular/router';
// import { HttpHeaders } from '@angular/common/http';
// import { UserService } from '../services/user.service';
// import { User } from '../models/user';

// @Component({
//   selector: 'app-one-order-search',
//   templateUrl: './one-order-search.component.html',
//   styleUrl: './one-order-search.component.css',
// })
// export class OneOrderSearchComponent {
//   selectedOrder: Order | undefined;
//   selectedOrderId: number | undefined;
//   employee: User | undefined;
//   selectedEmployee: string = '';

//   employeeOptions = [
//     { label: 'Charlotte', value: '/api/employees/11' },
//     { label: 'Pauline', value: '/api/employees/12' },
//     { label: 'Denis', value: '/api/employees/13' },
//   ];

//   selectedStatus: string = ''; // to store the selected status
//   statusOptions = [
//     { label: 'En attente', value: '/api/status_orders/1' },
//     { label: 'En cours', value: '/api/status_orders/2' },
//     { label: 'Terminée', value: '/api/status_orders/3' },
//   ];

//   @Input() order!: Order | null;
//   @Output() closeDetails = new EventEmitter<void>();
//   // selectedProducId: number=5;

//   // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
//   constructor(
//     private orderService: OrderService,
//     private route: ActivatedRoute,
//     private employeeService: UserService
//   ) {
//     // this.getProduct(<number>this.selectedProductId);
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.selectedOrderId = +params['id']; // Convertir l'ID en nombre
//       this.getOrder(this.selectedOrderId);
//     });

//     // this.employeeChoice();
//   }

//   // employeeChoice(): void {
//   //   this.employeeService.getEmployee().subscribe(
//   //     (employee: User) => {
//   //       this.employee = employee;
//   //     },
//   //     (error: any) => {
//   //       console.error('Erreur lors de la récupération des employés :', error);
//   //     }
//   //   );
//   // }

//   // Méthode pour récupérer un seul order en fonction de son ID en utilisant le nouveau service
//   getOrder(orderId: number): void {
//     this.orderService
//       .getOneOrder(orderId, { headers: new HttpHeaders() })
//       .subscribe((order: Order) => {
//         this.selectedOrder = order;
//         console.log(this.selectedOrder);
//       });
//   }

//   CloseDetails(): void {
//     this.closeDetails.emit();
//   }

//   updateOrderStatus(orderId: number, orderData: any): void {
//     this.orderService.updateOrderStatus(orderId, orderData).subscribe(
//       () => {
//         console.log('Le statut de la commande a été mis à jour avec succès');
//       },
//       (error) => {
//         console.error(
//           'Échec de la mise à jour du statut de la commande :',
//           error
//         );
//       }
//     );
//   }

//   updateOrder(): void {
//     if (!this.selectedOrder) {
//       console.error('Aucune commande sélectionnée.');
//       return;
//     }
//     const orderId = this.selectedOrder.id;
//     const orderData = {
//       dateOrder: '2024-03-03T04:13:43+00:00',
//       dateRender: '2024-03-20T00:00:00+00:00',
//       client: '/api/clients/2',
//       statusOrder: '/api/status_orders/2',
//     };

//     this.updateOrderStatus(orderId, orderData);
//   }
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

  selectedStatus: string = ''; // to store the selected status
  // statusOptions = [
  //   { label: 'En attente', value: '/api/status_orders/1' },
  //   { label: 'En cours', value: '/api/status_orders/2' },
  //   { label: 'Terminée', value: '/api/status_orders/3' },
  // ];

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

    this.loadStatusOptions();
  }

  loadStatusOptions(): void {
    this.statusService
      .getStatus(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.statusesOptions = data['hydra:member'];
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
    if (!this.selectedOrder || isNaN(this.selectedOrder.id)) {
      console.error('Aucune commande sélectionnée ou ID de commande invalide.');
      return;
    }

    const orderId = this.selectedOrder.id;
    const clientId = this.selectedOrder.client['@id'];
    const orderData = {
      dateOrder: this.selectedOrder.dateOrder, // Utilisez les données actuelles
      dateRender: this.selectedOrder.dateRender, // Utilisez les données actuelles
      numberOrder: this.selectedOrder.numberOrder,
      client: clientId,
      statusOrder: this.selectedStatus, // Utilisez le statut sélectionné
      // Ajoutez d'autres champs nécessaires ici
    };
    console.log('Données de commande à envoyer :', orderData);

    this.updateOrderStatus(orderId, orderData);
  }
}

// updateOrderManager(managerId: string): void {
//   if (!this.selectedOrder) return; // Vérifier si la commande est définie

//   const updatedOrderData = {
//     employee: managerId, // Utilisez la propriété correcte pour spécifier l'employé
//     // Autres données à mettre à jour si nécessaire...
//   };

//   const orderId = this.selectedOrder.id;
//   console.log('Updating order with ID:', orderId);
//   console.log('Updated order data:', updatedOrderData);
//   this.orderService.updateEmployee(orderId, updatedOrderData).subscribe(
//     () => {
//       console.log('Le manager de la commande a été mis à jour avec succès');
//     },
//     (error) => {
//       console.error(
//         'Échec de la mise à jour du manager de la commande :',
//         error
//       );
//     }
//   );
// }
