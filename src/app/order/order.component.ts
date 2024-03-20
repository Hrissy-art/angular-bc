import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  formGroup: FormGroup;
  orderId: string = '';
  statusOptions = [
    { label: 'En attente', value: '/api/status_orders/1' },
    { label: 'En cours', value: '/api/status_orders/2' },
    { label: 'Terminée', value: '/api/status_orders/3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private orderService: OrderService
  ) {
    this.formGroup = this.formBuilder.group({
      dateOrder: ['', Validators.required],
      dateRender: ['', Validators.required],
      client: ['', Validators.required],
      statusOrder: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Order;
      this.createOrder(formData).subscribe(
        (response) => {
          console.log('Commande envoyée avec succès !', response);
          if (response.id !== null && response.id !== undefined) {
            this.orderId = response.id;
            // Utilisez this.orderId comme nécessaire ici, par exemple, stockez-le dans le stockage local
            localStorage.setItem('orderId', this.orderId);
            const storedOrderId = localStorage.getItem('orderId');
            console.log(
              'ID de commande sauvegardé dans le local storage :',
              storedOrderId
            );
          }
          this.formGroup.reset();
        },
        (error) => {
          console.error("Erreur lors de l'envoi de la commande:", error);
        }
      );
    } else {
      // Manipulation des erreurs de formulaire
    }
  }

  createOrder(order: Order): Observable<any> {
    return this.orderService.createOrder(order);
  }
}
