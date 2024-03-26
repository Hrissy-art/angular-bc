import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: User[] | undefined;

  selectedPaymentMethod: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getUsers(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.users = data['hydra:member'];
      });
  }
}
