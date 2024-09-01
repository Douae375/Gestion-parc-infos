import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipementDTO } from './models/Equipement-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private apiUrl = 'http://localhost:1010/api/equipements';

  constructor(private http: HttpClient) {}

  // Create a new equipment
  createEquipement(equipement: EquipementDTO): Observable<EquipementDTO> {
    return this.http.post<EquipementDTO>(this.apiUrl, equipement);
  }

  // Get all equipment
  getAllEquipements(): Observable<EquipementDTO[]> {
    return this.http.get<EquipementDTO[]>(this.apiUrl);
  }

  // Get equipment by ID
  getEquipementById(id: number): Observable<EquipementDTO> {
    return this.http.get<EquipementDTO>(`${this.apiUrl}/${id}`);
  }

  // Update an existing equipment
  updateEquipement(id: number, equipement: EquipementDTO): Observable<EquipementDTO> {
    return this.http.put<EquipementDTO>(`${this.apiUrl}/${id}`, equipement);
  }

  // Delete an equipment by ID
  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

// equipement.service.ts
countEquipementsByType(): Observable<{ type: string, count: number }[]> {
  return this.http.get<{ type: string, count: number }[]>(`${this.apiUrl}/count-by-type`);
}

}
