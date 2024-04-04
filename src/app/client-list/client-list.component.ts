import { Component, EventEmitter, Output } from '@angular/core';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { AppComponent } from '../app.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
  clients!: Client[];
  selectedClient!: Client | null;
  error: string | null = null;

  @Output() clientSelected = new EventEmitter<number>();
  searchTerm: string = '';
  filteredClients: Client[] = [];
  showFilteredClients: boolean = false;

  constructor(
    private clientService: ClientsService,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients({ headers: new HttpHeaders() }).subscribe(
      (data: any) => {
        this.clients = data['hydra:member'];
        console.log(data);
        this.applyFilter();
      },
      (error) => {
        this.error = 'An error occurred while fetching the employees.';
        console.error('Error fetching employees:', error);
      }
    );
  }
  CloseDetails(): void {
    this.selectedClient = null;
    console.log('Bouton cliqué');
  }

  onSelectClient(client: Client): void {
    this.selectedClient = client;
    localStorage.setItem('selectedClientId', client.id.toString());
  }

  deleteClient(clientId: number): void {
    this.clientService
      .deleteClient(clientId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product deleted with ID:', clientId);
        // Recharger la liste des produits après la suppression
        this.loadClients();
      });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredClients = []; // Réinitialiser les clients filtrés si la boîte de recherche est vide
      this.showFilteredClients = false; // Masquer la liste des clients filtrés
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter((client) => {
      // Filtrer les clients dont le prénom ou le nom de famille contient le terme de recherche
      return (
        client.firstName.toLowerCase().includes(searchTermLower) ||
        client.lastName.toLowerCase().includes(searchTermLower)
      );
    });

    this.showFilteredClients = true; // Afficher la liste des clients filtrés
  }
}
