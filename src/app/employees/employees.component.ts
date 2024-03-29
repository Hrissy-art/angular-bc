import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employees!: Employee[];
  selectedEmployee!: Employee | null;
  error: string | null = null;

  @Output() employeeSelected = new EventEmitter<number>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees({ headers: new HttpHeaders() }).subscribe(
      (data: any) => {
        this.employees = data['hydra:member'];
        console.log(data);
      },
      (error) => {
        this.error = 'An error occurred while fetching the employees.';
        console.error('Error fetching employees:', error);
      }
    );
  }
  CloseDetails(): void {
    this.selectedEmployee = null;
    console.log('Bouton cliqué');
  }

  onSelectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    localStorage.setItem('selectedEmployeeId', employee.id.toString());
  }
}
