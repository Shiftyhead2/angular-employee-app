import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api-response';
import { FormattedEmployee } from './formatted-employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl:string = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<FormattedEmployee[]>{
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        return response.data.map(employee => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          jobTitle: employee.jobTitle,
          birthDate:this.formatBirthDate(employee.dateOfBirth),
        }));
      })
    )
  }


  private formatBirthDate(dateofBirth: string): string
  {
    const date: Date = new Date(dateofBirth);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

}
