import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatusOrder } from '../models/statusOrder';
import { StatusService } from '../services/status.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-statuses-list',
  templateUrl: './statuses-list.component.html',
  styleUrl: './statuses-list.component.css',
})
export class StatusesListComponent implements OnInit {
  statuses: StatusOrder[] | undefined;
  selectedStatusOrder!: StatusOrder | null;

  @Output() statusSelected = new EventEmitter<number>();

  constructor(
    private statusService: StatusService,
    private router: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadStatuses();
    console.log(this.statuses);
  }

  loadStatuses(): void {
    this.statusService
      .getStatus(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.statuses = data['hydra:member'];
      });
  }

  deleteStatus(statusId: number): void {
    this.statusService
      .deleteStatus(statusId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Status deleted with ID:', statusId);
        this.loadStatuses();
      });
  }

  CloseDetails(): void {
    this.selectedStatusOrder = null;
    console.log('Bouton cliqué');
  }

  onSelectStatus(status: StatusOrder): void {
    console.log('Selected status:', status);

    this.selectedStatusOrder = status;
    if (status.id !== undefined && status.id !== null) {
      localStorage.setItem('selectedStatusId', status.id.toString());
    } else {
      console.error('Status ID is undefined or null.');
    }
  }
}
