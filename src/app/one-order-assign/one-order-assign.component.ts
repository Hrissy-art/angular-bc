// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Order } from '../models/order';
// import { OrderService } from '../services/order.service';
// import { ActivatedRoute } from '@angular/router';
// import { HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-one-order-assign',
//   templateUrl: './one-order-assign.component.html',
//   styleUrl: './one-order-assign.component.css',
// })
// export class OneOrderAssignComponent {
//   selectedOrder: Order | undefined;
//   selectedOrderId?: number;
//   selectedEmployee: string = '';

//   selectedStatus: string = ''; // to store the selected status
//   employeeOptions = [
//     { label: 'Pauline', value: '/api/employees/11' },
//     { label: 'Julien', value: '/api/employees/12' },
//     { label: 'Charlotte', value: '/api/employees/13' },
//   ];

//   @Input() order!: Order | null;
//   @Output() closeDetails = new EventEmitter<void>();
//   // selectedProducId: number=5;

//   // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
//   constructor(
//     private orderService: OrderService,
//     private route: ActivatedRoute
//   ) {
//     // this.getProduct(<number>this.selectedProductId);
//   }

//   ngOnInit(): void {
//     const selectedOrderId = localStorage.getItem('selectedOrderId');
//     if (selectedOrderId) {
//       this.getOrder(+selectedOrderId); // Convertir en nombre si nécessaire
//     } else {
//       console.error('ID de commande invalide:', selectedOrderId);
//     }
//   }

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

//   updateEmployee(employeeId: number): void {
//     if (!this.order || isNaN(this.order.id)) {
//       console.error('Invalid order or order ID.');
//       return;
//     }

//     const orderId = this.order.id;
//     this.orderService.updateEmployee(orderId, employeeId).subscribe(
//       () => {
//         console.log('Employee updated successfully.');
//       },
//       (error) => {
//         console.error('Failed to update employee:', error);
//       }
//     );
//   }

//   updateOrder(): void {
//     if (!this.selectedOrder || isNaN(this.selectedOrder.id)) {
//       console.error('Aucune commande sélectionnée ou ID de commande invalide.');
//       return;
//     }

//     const orderId = this.selectedOrder.id;
//     const clientId = this.selectedOrder.client['@id'];
//     const statusOrderId = this.selectedOrder.statusOrder['@id'];
//     const orderData = {
//       dateOrder: this.selectedOrder.dateOrder, // Utilisez les données actuelles
//       dateRender: this.selectedOrder.dateRender, // Utilisez les données actuelles
//       client: clientId,
//       statusOrder: statusOrderId,
//       employee: this.selectedEmployee,
//     };
//     console.log('Données de commande à envoyer :', orderData);
//     this.orderService.updateEmployee(orderId, orderData).subscribe(
//       () => {
//         console.log('Commande mise à jour avec succès.');
//       },
//       (error) => {
//         console.error('Échec de la mise à jour de la commande :', error);
//       }
//     );
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-one-order-assign',
  templateUrl: './one-order-assign.component.html',
  styleUrl: './one-order-assign.component.css',
})
export class OneOrderAssignComponent {
  selectedOrder: Order | undefined;
  selectedOrderId?: number;
  selectedEmployee: string = '';

  selectedStatus: string = ''; // to store the selected status
  employeeOptions: { '@id': string; firstName: string }[] = [];

  @Input() order!: Order | null;
  @Output() closeDetails = new EventEmitter<void>();
  // selectedProducId: number=5;

  // j'ai ajouté private route: Activated Route pour accéder à l'id du produit sélectionné
  constructor(
    private orderService: OrderService,
    private employeeService: EmployeeService,
    private app: AppComponent,
    private route: ActivatedRoute
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
    this.loadEmployeeOptions();
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

  loadEmployeeOptions(): void {
    this.employeeService
      .getEmployees(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.employeeOptions = data['hydra:member'];

        console.log('Employés récupérés:', this.employeeOptions);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateEmployee(employeeId: number): void {
    if (!this.order || isNaN(this.order.id)) {
      console.error('Invalid order or order ID.');
      return;
    }

    const orderId = this.order.id;
    this.orderService.updateEmployee(orderId, employeeId).subscribe(
      () => {
        console.log('Employee updated successfully.');
      },
      (error) => {
        console.error('Failed to update employee:', error);
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
    const statusOrderId = this.selectedOrder.statusOrder['@id'];
    const orderData = {
      dateOrder: this.selectedOrder.dateOrder, // Utilisez les données actuelles
      dateRender: this.selectedOrder.dateRender, // Utilisez les données actuelles
      client: clientId,
      statusOrder: statusOrderId,
      employee: this.selectedEmployee,
    };
    console.log('Données de commande à envoyer :', orderData);
    this.orderService.updateEmployee(orderId, orderData).subscribe(
      () => {
        console.log('Commande mise à jour avec succès.');
      },
      (error) => {
        console.error('Échec de la mise à jour de la commande :', error);
      }
    );
  }
}
