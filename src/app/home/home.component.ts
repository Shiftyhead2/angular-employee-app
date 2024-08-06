import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListingComponent } from '../employee-listing/employee-listing.component';
import { EmployeeService } from '../employee-service';
import { FormattedEmployee } from '../formatted-employee';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmployeeListingComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allEmployees: FormattedEmployee[] = [];
  filteredEmployees: FormattedEmployee[] = [];
  allJobTitles: string[] = [];


  selectedFilterOption: string = '';
  filterForm: FormGroup;

  sortOptions: string[] = ['Imenu', 'Prezimenu', 'Poziciji'];
  selectedSortOption: string = '';



  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      filterSelect: new FormControl<string>('None'),
      findInput: new FormControl<string>(''),
      sortSelect: new FormControl<string>('None'),
    });

    this.selectedFilterOption = 'None';
    this.selectedSortOption = "None";
  }


  ngOnInit(): void {
    this.employeeService.getEmployees().pipe(
      tap(data => {
        this.allEmployees = data;
        this.filteredEmployees = data;
        this.allJobTitles = this.employeeService.getUniqueJobTitles(data);
      }),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    ).subscribe();

    this.filterForm.valueChanges.subscribe(() => this.applyFilterAndSort());
  }

  applyFilterAndSort(): void {
    this.selectedFilterOption = this.filterForm.value.filterSelect || this.allJobTitles[0];
    this.selectedSortOption = this.filterForm.value.sortSelect || 'None';
    const inputValue: string = (this.filterForm.value.findInput || '').toLowerCase();

    // Apply filter
    this.filteredEmployees = this.allEmployees.filter(employee => {
      let match = true;

      if (this.selectedFilterOption !== 'None') {
        match = employee.jobTitle.toLowerCase().includes(this.selectedFilterOption.toLowerCase());
      }

      if (inputValue) {
        match = match && (
          employee.name.toLowerCase().includes(inputValue)
        );
      }

      return match;
    });



    // Apply sort
    if (this.selectedSortOption === 'None') {
      this.filteredEmployees = [...this.filteredEmployees];
    } else if (this.selectedSortOption === this.sortOptions[0]) { // Sort by first name
      this.filteredEmployees.sort((a, b) =>
        a.name.split(' ')[0].localeCompare(b.name.split(' ')[0])
      );
    } else if (this.selectedSortOption === this.sortOptions[1]) { // Sort by last name
      this.filteredEmployees.sort((a, b) =>
        (a.name.split(' ')[1] || '').localeCompare(b.name.split(' ')[1] || '')
      );
    } else { // Sort by job title
      this.filteredEmployees.sort((a, b) =>
        a.jobTitle.localeCompare(b.jobTitle)
      );
    }
  }
}
