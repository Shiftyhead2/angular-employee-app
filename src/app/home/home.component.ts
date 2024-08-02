import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeService } from '../employee-service';
import { FormattedEmployee } from '../formatted-employee';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmployeeListingComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allEmployees: FormattedEmployee[] = [];
  filteredEmployees: FormattedEmployee[] = [];

  filterOptions: string[] = ['Imenu', 'Prezimenu', 'Poziciji'];
  selectedFilterOption: string = '';
  filterForm: FormGroup;



  constructor(private employeeService: EmployeeService, private fb: FormBuilder)
  {
    this.filterForm = this.fb.group({
      filterSelect: new FormControl<string>(this.filterOptions[0]),
      filterInput: new FormControl<string>('')
    });

    this.selectedFilterOption = this.filterOptions[0];
  }


  ngOnInit(): void {
    this.employeeService.getEmployees().pipe(
      tap(data => {
        this.allEmployees = data;
        this.filteredEmployees = data;
      }),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    ).subscribe();
  }


  applyFilter(): void
  {
    this.selectedFilterOption = this.filterForm.value.filterSelect;
    if (this.filterForm.get('filterInput')?.value)
    {
      this.filterEmployeesBy();
    }
  }

  filterEmployeesBy(): void
  {
    const value: string = this.filterForm.value.filterInput.toLowerCase();
    if (!value)
    {
      this.filteredEmployees = this.allEmployees;
      return;
    }
    
    if (this.selectedFilterOption === this.filterOptions[0])
    {
      this.filteredEmployees = this.allEmployees.filter(employee =>
        employee.name.split(' ')[0].toLowerCase().includes(value)
      );
    }
    else if (this.selectedFilterOption === this.filterOptions[1])
    {
      this.filteredEmployees = this.allEmployees.filter(employee =>
        employee.name.split(' ')[1].toLowerCase().includes(value)
      );
    }
    else
    {
      this.filteredEmployees = this.allEmployees.filter(employee =>
        employee.jobTitle.toLowerCase().includes(value)
      );
     }
  }
  
}
