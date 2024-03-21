import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  payment: Payment | undefined;
  paymentOptions = [
    { label: 'Carte de crédit', value: '/api/payments/1' },
    { label: 'Carte de débit', value: '/api/payments/2' },
    { label: 'PayPal', value: '/api/payments/3' },
  ];
  selectedPaymentMethod: any;

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.paymentMethod();
  }

  paymentMethod(): void {
    this.paymentService.getPaymentMethod().subscribe(
      (payment: Payment) => {
        this.payment = payment;
      },
      (error: any) => {}
    );
  }

  redirectToAnotherPage() {
    this.router.navigate(['/paymentInfo']);
  }
}
