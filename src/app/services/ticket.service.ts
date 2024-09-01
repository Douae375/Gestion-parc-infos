import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDTO } from './models/Ticket-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:1010/api/tickets';

  constructor(private http: HttpClient) {}

  // Get all tickets
  getAllTickets(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(this.apiUrl);
  }

  // Create a new ticket
  createTicket(ticket: TicketDTO): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(this.apiUrl, ticket);
  }

  // Update an existing ticket by ID
  updateTicket(id: number, ticket: TicketDTO): Observable<TicketDTO> {
    return this.http.put<TicketDTO>(`${this.apiUrl}/${id}`, ticket);
  }

  // Delete a ticket by ID
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get a ticket by ID
  getTicketById(id: number): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(`${this.apiUrl}/${id}`);
  }

  // Get tickets by status
  getTicketsByStatut(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-status`);
  }

  // Get tickets by technician
  getTicketsByTechnician(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-technician`);
  }

  // Get tickets by equipment type
  getTicketsByEquipementType(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-equipement-type`);
  }
}
