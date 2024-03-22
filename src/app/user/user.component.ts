import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  employee: User | undefined;
  paymentOptions = [
    { label: 'Charlotte', value: '/api/employee/11' },
    { label: 'Pauline', value: '/api/employee/12' },
    { label: 'Denis', value: '/api/employee/13' },
  ];
  selectedPaymentMethod: any;
  constructor(private employeeService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.employeeChoice();
  }

  employeeChoice(): void {
    this.employeeService.getEmployee().subscribe(
      (employee: User) => {
        this.employee = employee;
      },
      (error: any) => {}
    );
  }
}
