import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-one-employee',
  templateUrl: './one-employee.component.html',
  styleUrl: './one-employee.component.css',
})
export class OneEmployeeComponent {
  selectedEmployee: Employee | undefined;
  selectedEmployeeId?: number;

  @Input() employee!: Employee | null;
  @Output() closeDetails = new EventEmitter<void>();

  constructor(
    private employeeService: EmployeeService,
    private app: AppComponent,
    private route: ActivatedRoute
  ) {
    // this.getProduct(<number>this.selectedProductId);
  }

  ngOnInit(): void {
    const selectedEmployeeId = localStorage.getItem('selectedEmployeeId');
    if (selectedEmployeeId) {
      this.getEmployee(+selectedEmployeeId); // Convertir en nombre si nécessaire
    } else {
      console.error('ID de commande invalide:', selectedEmployeeId);
    }
  }

  getEmployee(employeeId: number): void {
    this.employeeService
      .getOneEmployee(employeeId, { headers: new HttpHeaders() })
      .subscribe((employee: Employee) => {
        this.selectedEmployee = employee;
        console.log(this.selectedEmployee);
      });
  }

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateEmployee(): void {
    if (this.selectedEmployee) {
      const headers = new HttpHeaders(); // Créez un objet HttpHeaders vide
      this.employeeService
        .updateEmployee(this.selectedEmployee.id, this.selectedEmployee, {
          headers,
        })
        .subscribe(
          (updatedEmployee) => {
            // Traitement après la mise à jour de l'employé
          },
          (error) => {
            console.error("Erreur lors de la mise à jour de l'employé:", error);
          }
        );
    }
  }
}
