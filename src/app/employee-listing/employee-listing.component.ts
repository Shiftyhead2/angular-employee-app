import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedEmployee } from '../formatted-employee';


@Component({
  selector: 'app-employee-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-listing.component.html',
  styleUrl: './employee-listing.component.css'
})
export class EmployeeListingComponent{
  @Input() employee!:FormattedEmployee;
  
}
