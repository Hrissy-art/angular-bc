import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-client',
  templateUrl: './one-client.component.html',
  styleUrl: './one-client.component.css',
})
export class OneClientComponent {
  selectedClient: Client | undefined;
  selectedClientId?: number;

  @Input() client!: Client | null;
  @Output() closeDetails = new EventEmitter<void>();

  newClient: Client = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    adress: '',
    street_number: '',
    town: '',
    district: '',
    country: '',
  };

  constructor(
    private clientService: ClientsService,
    private app: AppComponent,
    private route: ActivatedRoute
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    const selectedClientId = localStorage.getItem('selectedClientId');
    if (selectedClientId) {
      this.getClient(+selectedClientId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedClientId);
    }
  }

  getClient(clientId: number): void {
    this.clientService
      .getOneClient(clientId, { headers: new HttpHeaders() })
      .subscribe((client: Client) => {
        this.selectedClient = client;
        console.log(this.selectedClient);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateClient(): void {
    if (this.selectedClient) {
      const headers = new HttpHeaders(); // Créez un objet HttpHeaders vide
      this.clientService
        .updateClient(this.selectedClient.id, this.selectedClient, {
          headers,
        })
        .subscribe(
          (updatedClient) => {
            // Traitement après la mise à jour de l'employé
          },
          (error) => {
            console.error("Erreur lors de la mise à jour de l'employé:", error);
          }
        );
    }
  }

  addClient(): void {
    const headers = new HttpHeaders();
    this.clientService.addClient(this.newClient, { headers }).subscribe(
      (response) => {
        console.log('Nouvel employé ajouté avec succès:', response);
        // Réinitialiser les champs du formulaire après l'ajout du matériau

        this.newClient.email = '';
        this.newClient.password = '';
        this.newClient.firstName = '';
        this.newClient.lastName = '';
        this.newClient.birthday = new Date();
        this.newClient.adress = '';
        this.newClient.street_number = '';
        this.newClient.town = '';
        this.newClient.district = '';
        this.newClient.country = '';
      },
      (error) => {
        console.error("Erreur lors de l'ajout du matériau:", error);
      }
    );
  }
}
