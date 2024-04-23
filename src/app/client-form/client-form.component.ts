import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export class ClientFormComponent implements OnInit {
  birthday: string = '';
  userId: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  formatDate(event: any): void {
    const inputDate = new Date(event.target.value);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);
    this.birthday = `${year}-${month}-${day}`;
  }

  register(form: NgForm) {
    if (form.valid) {
      this.loginService.register(form.value).subscribe({
        next: (response: any) => {
          console.log("You've registered", response);

          // Note : Récupérer l'ID de l'utilisateur depuis la réponse
          this.userId = response.id;

          if (this.userId) {
            // Note: Stocker l'ID de l'utilisateur dans le stockage local
            localStorage.setItem('userId', this.userId);
            const storedUserId = localStorage.getItem('userId');
            console.log(
              "ID de l'utilisateur sauvegardé dans le local storage :",
              storedUserId
            );
          } else {
            console.error('User ID not found in server response');
          }

          // Redirection après inscription réussie
          this.router.navigate(['/cart']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
