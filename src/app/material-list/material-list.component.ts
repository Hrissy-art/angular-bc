import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selectedMaterial!: Material | null;

  @Output() materialSelected = new EventEmitter<number>();

  constructor(
    private materialService: MaterialService,
    private app: AppComponent
  ) {}
  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService
      .getMaterials(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.materials = data['hydra:member'];
      });
  }
  deleteMaterial(materialId: number): void {
    this.materialService
      .deleteMaterial(materialId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Material deleted with ID:', materialId);
        this.loadMaterials();
      });
  }

  CloseDetails(): void {
    this.selectedMaterial = null;
    console.log('Bouton cliqué');
  }

  onSelectMaterial(material: Material): void {
    console.log('Selected material:', material);

    this.selectedMaterial = material;
    if (material.id !== undefined && material.id !== null) {
      localStorage.setItem('selectedMaterialId', material.id.toString());
    } else {
      console.error('Material ID is undefined or null.');
    }
  }
}
