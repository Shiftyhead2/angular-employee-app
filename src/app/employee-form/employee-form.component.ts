import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group(
      {
        firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        dateOfBirth: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
        jobTitle: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
      });
  }

  onSubmit(): void {
    console.log(`Submitted form:\nIme:${this.employeeForm.value.firstName} ${this.employeeForm.value.lastName}\nGodina rođenja:${this.employeeForm.value.dateOfBirth}\nPozicija:${this.employeeForm.value.jobTitle}`);
    this.employeeForm.reset();
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get dateOfBirth() {
    return this.employeeForm.get('dateOfBirth');
  }

  get jobTitle() {
    return this.employeeForm.get('jobTitle');
  }
}
