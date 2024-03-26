import { Component, OnInit } from '@angular/core';
import { Material } from '../models/material';
import { MaterialService } from '../services/material.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css',
})
export class MaterialListComponent implements OnInit {
  materials: Material[] | undefined;

  constructor(
    private serviceMaterial: MaterialService,
    private app: AppComponent
  ) {}
  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.serviceMaterial
      .getMaterials(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.materials = data['hydra:member'];
      });
  }
}
