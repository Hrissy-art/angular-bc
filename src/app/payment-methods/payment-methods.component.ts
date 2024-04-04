import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent implements OnInit {
  payments: Payment[] = [];
  selectedPaymentMethod: string | undefined;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadPayments();
    console.log(this.payments);
  }

  loadPayments(): void {
    this.paymentService
      .getPaymentMethod(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.payments = data['hydra:member'];
      });
  }
}
