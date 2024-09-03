import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { EquipementService } from '../../services/equipement.service';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class HomeUserComponent implements OnInit {
  ticketForm: FormGroup;
  equipements: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private equipementService: EquipementService,
    private userService: UserService
  ) {
    // Initialize the form in the constructor
    this.ticketForm = this.fb.group({
      description: ['', Validators.required],
      type: ['Reclamation', Validators.required],
      equipementSerie: ['', Validators.required], // Changed from equipementId to equipementSerie
      userId: ['', Validators.required],
      statut: ['Open'],
      date: [new Date()]  // Setting the current date
    });
  }

  ngOnInit(): void {
    this.loadEquipements();
    this.loadUsers();
  }

  loadEquipements(): void {
    this.equipementService.getAll().subscribe((data: any[]) => {
      console.log('Equipements:', data);
      this.equipements = data;
    });
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data: any[]) => {
      console.log('Users:', data);
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      // Set the current date and time
      this.ticketForm.patchValue({
        date: new Date().toISOString()
      });

      // Prepare the payload using equipementSerie
      const ticketPayload = {
        description: this.ticketForm.value.description,
        type: this.ticketForm.value.type,
        statut: this.ticketForm.value.statut,
        date: this.ticketForm.value.date,
        equipement: { serie: this.ticketForm.value.equipementSerie }, // Changed to use serie instead of id
        user: { id: this.ticketForm.value.userId } // Only the ID is sent
      };
      console.log('Ticket Payload:', ticketPayload);

      this.ticketService.create(ticketPayload).subscribe(() => {
        // Use SweetAlert2 for the success message
        Swal.fire({
          icon: 'success',
          title: 'Ticket Created',
          text: 'Your ticket has been created successfully!'
        });

        // Reset the form
        this.ticketForm.reset({ statut: 'Open', type: 'Reclamation' });
      });
    }
  }
  logout(): void {
    // Implement your logout logic here
    window.location.href = '/login'; // Replace with your actual login route
  }
}
