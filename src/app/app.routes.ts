import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component:HomeComponent,
  },
  {
    path: 'employee-form',
    title: 'Employee Form',
    component:EmployeeFormComponent,
  }
];
