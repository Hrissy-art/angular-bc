import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent implements OnInit {
  services: Service[] | undefined;

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
}
