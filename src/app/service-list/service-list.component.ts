import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent implements OnInit {
  services!: Service[];
  selectedService!: Service | null;

  @Output() serviceSelected = new EventEmitter<number>();

  constructor(
    private serviceService: ServiceService,
    private app: AppComponent
  ) {}
  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService
      .getServices(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.services = data['hydra:member'];
      });
  }

  deleteService(serviceId: number): void {
    this.serviceService
      .deleteService(serviceId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product deleted with ID:', serviceId);
        this.loadServices();
      });
  }

  CloseDetails(): void {
    this.selectedService = null;
    console.log('Bouton cliqué');
  }

  onSelectService(service: Service): void {
    console.log('Selected service:', service);

    this.selectedService = service;
    if (service.id !== undefined && service.id !== null) {
      localStorage.setItem('selectedServiceId', service.id.toString());
    } else {
      console.error('Service ID is undefined or null.');
    }
  }
}
