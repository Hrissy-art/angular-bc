import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Chemin vers votre fichier HTML
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    adress: '',
    birthday: '',
    towns: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    const body: string = JSON.stringify(this.user); 
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<any>('http://localhost:8000/api/users', body, { headers: headers }).subscribe({
      next: (response) => {
        // Gérer la réponse du serveur ici
        console.log(response);
        // Rediriger l'utilisateur vers une autre page après l'inscription réussie
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Gérer les erreurs d'inscription ici
        console.error(error);
      }
    });
  }
}
