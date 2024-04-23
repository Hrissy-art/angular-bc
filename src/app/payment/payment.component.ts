import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
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

  redirectToAnotherPage(): void {
    this.router.navigate(['/paymentInfo']);
  }
}
