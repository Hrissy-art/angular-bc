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

  newEmployee: Employee = {
    empNumber: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    adress: '',
    street_number: '',
    town: '',
    district: '',
    country: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private app: AppComponent,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const selectedEmployeeId = localStorage.getItem('selectedEmployeeId');
    if (selectedEmployeeId) {
      this.getEmployee(+selectedEmployeeId);
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
      const headers = new HttpHeaders();
      this.employeeService
        .updateEmployee(this.selectedEmployee.id, this.selectedEmployee, {
          headers,
        })
        .subscribe(
          (updatedEmployee) => {},
          (error) => {
            console.error("Erreur lors de la mise à jour de l'employé:", error);
          }
        );
    }
  }

  addEmployee(): void {
    const headers = new HttpHeaders();
    this.employeeService.addEmployee(this.newEmployee, { headers }).subscribe(
      (response) => {
        console.log('Nouvel employé ajouté avec succès:', response);

        (this.newEmployee.empNumber = 0), (this.newEmployee.email = '');
        this.newEmployee.password = '';
        this.newEmployee.firstName = '';
        this.newEmployee.lastName = '';
        this.newEmployee.birthday = new Date();
        this.newEmployee.adress = '';
        this.newEmployee.street_number = '';
        this.newEmployee.town = '';
        this.newEmployee.district = '';
        this.newEmployee.country = '';
      },
      (error) => {
        console.error("Erreur lors de l'ajout du matériau:", error);
      }
    );
  }
}
