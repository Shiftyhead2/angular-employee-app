import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeService } from '../employee-service';
import { FormattedEmployee } from '../formatted-employee';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmployeeListingComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: FormattedEmployee[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.getEmployees().pipe(
      tap(data => {
        this.employees = data;
      }),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    ).subscribe();
  }
}
