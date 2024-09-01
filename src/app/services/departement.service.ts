import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartementDTO } from './models/Departement-dto.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:1010/api/departements';

  constructor(private http: HttpClient) {}

  // Create a new department
  createDepartement(departement: DepartementDTO): Observable<DepartementDTO> {
    return this.http.post<DepartementDTO>(this.apiUrl, departement);
  }

  // Get all departments
  getAllDepartements(): Observable<DepartementDTO[]> {
    return this.http.get<DepartementDTO[]>(this.apiUrl);
  }

  // Get a department by ID
  getDepartementById(id: number): Observable<DepartementDTO> {
    return this.http.get<DepartementDTO>(`${this.apiUrl}/${id}`);
  }

  // Update a department
  updateDepartement(id: number, departement: DepartementDTO): Observable<DepartementDTO> {
    return this.http.put<DepartementDTO>(`${this.apiUrl}/${id}`, departement);
  }

  // Delete a department
  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
