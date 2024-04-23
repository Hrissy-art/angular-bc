import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  birthday: string = '';

  formatDate(event: any): void {
    const inputDate = new Date(event.target.value);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);
    this.birthday = `${year}-${month}-${day}`;
  }

  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {}

  register(form: NgForm) {
    if (form.valid) {
      this.loginService.register(form.value).subscribe({
        next: (response: any) => {
          console.log("your've registered", response);
          // Redirection après inscription réussie
        },
        error: (error) => {
          console.error(error);
          // Gestion des erreurs d'inscription
        },
      });
    }
  }
}
