import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipementDTO } from './models/Equipement-dto.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EquipementService extends GenericService<EquipementDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/equipements');
  }

  // Specific method for counting equipment by type
  countEquipementsByType(): Observable<{ type: string, count: number }[]> {
    return this.http.get<{ type: string, count: number }[]>(`${this.apiUrl}/count-by-type`);
  }

}
