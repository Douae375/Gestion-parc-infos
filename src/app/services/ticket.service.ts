import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDTO } from './models/Ticket-dto.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends GenericService<TicketDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/tickets');
  }



  // Specific method for getting tickets by status
  getTicketsByStatut(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-status`);
  }

  // Specific method for getting tickets by technician
  getTicketsByTechnician(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-technician`);
  }

  // Specific method for getting tickets by equipment type
  getTicketsByEquipementType(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-equipement-type`);
  }
}
