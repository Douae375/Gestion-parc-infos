import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  standalone: true,
  selector: 'app-technicien-user',
  templateUrl: './technicien-user.component.html',
  styleUrls: ['./technicien-user.component.css'],
  imports: [CommonModule, NavbarComponent],
})
export class TechnicienUserComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAll().subscribe((data: any[]) => {
      // Display all tickets that are Open, In Progress, or Closed
      this.tickets = data.filter(ticket => 
        ticket.statut === 'Open' || 
        ticket.statut === 'In Progress' || 
        ticket.statut === 'Closed'
      );
    });
  }

  takeTicket(ticket: any): void {
    if (ticket.statut === 'Open') {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to take this ticket?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, take it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ticket.statut = 'In Progress';
          this.ticketService.update(ticket.id, ticket).subscribe(() => {
            Swal.fire('Taken!', 'The ticket is now in progress.', 'success');
            this.loadTickets(); // Reload tickets to update the view
          });
        }
      });
    } else if (ticket.statut === 'In Progress') {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to mark this ticket as completed?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, complete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ticket.statut = 'Closed';
          this.ticketService.update(ticket.id, ticket).subscribe(() => {
            Swal.fire('Completed!', 'The ticket is now closed.', 'success');
            this.loadTickets(); // Reload tickets to update the view
          });
        }
      });
    }
  }

  canTakeTicket(ticket: any): boolean {
    return ticket.statut === 'Open' || ticket.statut === 'In Progress';
  }

  logout(): void {
    // Implement your logout logic here
    window.location.href = '/login'; // Replace with your actual login route
  }
}
