import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusOrder } from '../models/statusOrder';
import { StatusService } from '../services/status.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-status',
  templateUrl: './one-status.component.html',
  styleUrl: './one-status.component.css',
})
export class OneStatusComponent {
  selectedStatus: StatusOrder | undefined;
  selectedStatusId?: number;

  @Input() status!: StatusOrder | null;
  @Output() closeDetails = new EventEmitter<void>();

  newStatus: StatusOrder = {
    status: '',
  };

  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    const selectedStatusId = localStorage.getItem('selectedStatusId');
    if (selectedStatusId) {
      this.getStatus(+selectedStatusId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedStatusId);
    }
  }
  getStatus(statusId: number): void {
    this.statusService
      .getOneStatus(statusId, { headers: new HttpHeaders() })
      .subscribe((status: StatusOrder) => {
        this.selectedStatus = status;
        console.log(this.selectedStatus);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateStatus(
    statusId: number,
    updatedStatus: StatusOrder,
    options: any
  ): void {
    this.statusService.updateStatus(statusId, updatedStatus, options).subscribe(
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

  updateStatusDetails(): void {
    if (this.status) {
      this.statusService
        .updateStatus(this.status.id, this.status, {})
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

  addStatus(): void {
    this.statusService.addStatus(this.newStatus).subscribe(
      (response) => {
        console.log('Nouveau matériau ajouté avec succès:', response);
        // Réinitialiser les champs du formulaire après l'ajout du matériau
        this.newStatus.status = '';
      },
      (error) => {
        console.error("Erreur lors de l'ajout du matériau:", error);
      }
    );
  }
}
