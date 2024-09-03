import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartementDTO } from './models/Departement-dto.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService extends GenericService<DepartementDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/departements');
  }
}
