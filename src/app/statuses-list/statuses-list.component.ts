import { Component, OnInit } from '@angular/core';
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
  statuses: StatusOrder[] = [];
  selectedStatusOrder: string | undefined;

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
}
