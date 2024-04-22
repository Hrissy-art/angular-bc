import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-service',
  templateUrl: './one-service.component.html',
  styleUrl: './one-service.component.css',
})
export class OneServiceComponent {
  selectedService: Service | undefined;
  selectedServiceId?: number;
  successMessage: string | null = null;
  successMessageNewService: string | null = null;

  @Input() service!: Service | null;
  @Output() closeDetails = new EventEmitter<void>();

  newService: Service = {
    name: '',
    coeff: 0,
  };

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    const selectedServiceId = localStorage.getItem('selectedServiceId');
    if (selectedServiceId) {
      this.getService(+selectedServiceId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedServiceId);
    }
  }
  getService(serviceId: number): void {
    this.serviceService
      .getOneService(serviceId, { headers: new HttpHeaders() })
      .subscribe((service: Service) => {
        this.selectedService = service;
        console.log(this.selectedService);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateService(
    serviceId: number,
    updatedService: Service,
    options: any
  ): void {
    this.serviceService
      .updateService(serviceId, updatedService, options)
      .subscribe(
        () => {
          console.log('Le statut de la commande a été mis à jour avec succès');
        },
        (error) => {
          console.error(
            'Échec de la mise à jour du statut de la commande :',
            error
          );
        }
      );
  }

  updateServiceDetails(): void {
    if (this.service) {
      this.serviceService
        .updateService(this.service.id, this.service, {})
        .subscribe(
          () => {
            console.log(
              'Les détails du service ont été mis à jour avec succès'
            );
            this.successMessage =
              'Les détails du service ont été mis à jour avec succès';
          },
          (error) => {
            console.error(
              'Échec de la mise à jour des détails du service :',
              error
            );
          }
        );
    }
  }

  addService(): void {
    this.serviceService.addService(this.newService).subscribe(
      (response) => {
        console.log('Nouveau service ajouté avec succès:', response);
        this.newService.name = '';
        this.newService.coeff = 0;
        this.successMessageNewService = 'Nouveau service ajouté avec succès';
      },
      (error) => {
        console.error("Erreur lors de l'ajout du service:", error);
      }
    );
  }
}
