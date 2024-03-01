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
    town: ''
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


//2
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { User } from '../models/user';
// import { TownService } from '../town.service'; // Import du service TownService pour récupérer les villes

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: User = {
//     id: 0,
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     adress: '',
//     birthday: '',
// town: ''
//   };

//   towns: any[] = []; // Variable pour stocker les villes disponibles

//   constructor(private http: HttpClient, private router: Router, private townService: TownService) {}

//   ngOnInit() {
//     this.getTowns(); // Appel de la méthode pour récupérer les villes lors du chargement du composant
//   }

//   getTowns() {
//     this.townService.getTowns().subscribe((data: any) => {
//       if (data && data['hydra:member']) { // Vérifiez la présence de hydra:member dans la réponse
//         this.towns = data['hydra:member']; // Extraction des villes à partir de hydra:member
//       } else {
//         console.error("Data received from TownService is not in the expected format:", data);
//       }
//     });
//   }

//   register(): void {
//     const body: string = JSON.stringify(this.user); 
//     const headers = { 'Content-Type': 'application/json' };

//     this.http.post<any>('http://localhost:8000/api/clients', body, { headers: headers }).subscribe({
//       next: (response) => {
//         // Gérer la réponse du serveur ici
//         console.log(response);
//         // Rediriger l'utilisateur vers une autre page après l'inscription réussie
//         this.router.navigate(['/home']);
//       },
//       error: (error) => {
//         // Gérer les erreurs d'inscription ici
//         console.error(error);
//       }
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from '../models/user';
// import { TownService } from '../town.service'; 
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   user: User = {
//     id: 0,
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     adress: '', // Correction de la faute de frappe dans "address"
//     birthday: '',
//     town: ''
//   };

//   towns: any[] = []; 
  

//   constructor(private router: Router,private http: HttpClient, private townService: TownService) {}

//   ngOnInit() {
//     this.getTowns();
//   }

//   getTowns() {
//     this.townService.getTowns().subscribe((data: any) => { 
//       if (data && data['hydra:member']) {
//         this.towns = data['hydra:member'];
//       } else {
//         console.error("Data received from TownService is not in the expected format:", data);
//       }
//     });
//   }

//   register(): void {
//     const body: string = JSON.stringify(this.user); 
//     const headers = { 'Content-Type': 'application/json' };

//     this.http.post<any>('http://localhost:8000/api/clients', body, { headers: headers }).subscribe({
//       next: (response) => {
//         // Gérer la réponse du serveur ici
//         console.log(response);
//         // Rediriger l'utilisateur vers une autre page après l'inscription réussie
//         this.router.navigate(['/home']);
//       },
//       error: (error) => {
//         // Gérer les erreurs d'inscription ici
//         console.error(error);
//       }
//     });
//   }
// }
