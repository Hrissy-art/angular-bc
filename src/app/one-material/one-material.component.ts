import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '../models/material';
import { MaterialService } from '../services/material.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-material',
  templateUrl: './one-material.component.html',
  styleUrl: './one-material.component.css',
})
export class OneMaterialComponent {
  selectedMaterial: Material | undefined;
  selectedMaterialId?: number;

  @Input() material!: Material | null;
  @Output() closeDetails = new EventEmitter<void>();

  newMaterial: Material = {
    name: '',
    coeff: 0,
  };

  constructor(
    private materialService: MaterialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const selectedMaterialId = localStorage.getItem('selectedMaterialId');
    if (selectedMaterialId) {
      this.getMaterial(+selectedMaterialId);
    } else {
      console.error('ID de commande invalide:', selectedMaterialId);
    }
  }
  getMaterial(materialId: number): void {
    this.materialService
      .getOneMaterial(materialId, { headers: new HttpHeaders() })
      .subscribe((material: Material) => {
        this.selectedMaterial = material;
        console.log(this.selectedMaterial);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateMaterial(
    materialId: number,
    updatedMaterial: Material,
    options: any
  ): void {
    this.materialService
      .updateMaterial(materialId, updatedMaterial, options)
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

  updateMaterialDetails(): void {
    if (this.material) {
      this.materialService
        .updateMaterial(this.material.id, this.material, {})
        .subscribe(
          () => {
            console.log(
              'Les détails du service ont été mis à jour avec succès'
            );
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

  addMaterial(): void {
    this.materialService.addMaterial(this.newMaterial).subscribe(
      (response) => {
        console.log('Nouveau matériau ajouté avec succès:', response);
        this.newMaterial.name = '';
        this.newMaterial.coeff = 0;
      },
      (error) => {
        console.error("Erreur lors de l'ajout du matériau:", error);
      }
    );
  }
}
