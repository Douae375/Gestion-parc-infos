import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EquipementService } from '../../services/equipement.service';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';
import { DepartementService } from '../../services/departement.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableType: string = 'Users';
  entities: any[] = [];
  entityFields: any[] = [];
  form: FormGroup;
  isEditing: boolean = false;
  currentEntityId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private equipementService: EquipementService,
    private userService: UserService,
    private ticketService: TicketService,
    private departementService: DepartementService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableType']) {
      this.loadTableData();
    }
  }

  loadTableData(): void {
    switch (this.tableType) {
      case 'Users':
        this.userService.getAll().subscribe(data => {
          this.entities = data;
          this.entityFields = [
            { name: 'id', label: 'ID' },
            { name: 'username', label: 'Name' }, 
            { name: 'email', label: 'Email' }, 
            { name: 'password', label: 'Password' },
            { name: 'role', label: 'Role' },
            { name: 'departementId', label: 'Departement ID' }
          ];
          this.initializeForm();  
        });
        break;
      case 'Departement':
        this.departementService.getAll().subscribe(data => {
          this.entities = data;
          this.entityFields = [
            { name: 'id', label: 'ID' },
            { name: 'nom', label: 'Name' }
          ];
          this.initializeForm();  
        });
        break;
      case 'Equipement':
        this.equipementService.getAll().subscribe(data => {
          this.entities = data;
          this.entityFields = [
            { name: 'serie', label: 'Serie' },
            { name: 'nom', label: 'Name' }, 
            { name: 'modele', label: 'Model' },
            { name: 'type', label: 'Type' },
          ];
          this.initializeForm();  
        });
        break;
      case 'Ticket':
        this.ticketService.getAll().subscribe(data => {
          this.entities = data;
          this.entityFields = [
            { name: 'id', label: 'ID' },
            { name: 'description', label: 'Description' }, 
            { name: 'statut', label: 'Status' },
            { name: 'date', label: 'Date' },
            { name: 'type', label: 'Type' },
            { name: 'equipement.nom', label: 'Equipment Name' },
            { name: 'user.name', label: 'User Name' }
          ];
          this.initializeForm();  
        });
        break;
    }
  }

  getNestedValue(entity: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], entity);
  }

  initializeForm(): void {
    this.form = this.fb.group({});
    this.entityFields.forEach(field => {
      this.form.addControl(field.name, this.fb.control('', Validators.required));
    });
  }

  openModal(content: any): void {
    this.modalService.open(content);
    this.isEditing = false;
    this.currentEntityId = null;
    this.form.reset(); 
  }

  onSubmit(): void {
    const formData = this.form.value;

    if (this.isEditing && this.currentEntityId) {
      this.updateEntity(this.currentEntityId, formData);
    } else {
      this.createEntity(formData);
    }
    this.modalService.dismissAll(); 
  }

  createEntity(formData: any): void {
    switch (this.tableType) {
      case 'Users':
        this.userService.create(formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Created!', `${this.tableType} has been created successfully.`, 'success');
        });
        break;
      case 'Equipement':
        this.equipementService.create(formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Created!', `${this.tableType} has been created successfully.`, 'success');
        });
        break;
      case 'Ticket':
        this.ticketService.create(formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Created!', `${this.tableType} has been created successfully.`, 'success');
        });
        break;
      case 'Departement':
        this.departementService.create(formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Created!', `${this.tableType} has been created successfully.`, 'success');
        });
        break;
    }
  }

  updateEntity(id: number, formData: any): void {
    switch (this.tableType) {
      case 'Users':
        this.userService.update(id, formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Updated!', `${this.tableType} has been updated successfully.`, 'success');
        });
        break;
      case 'Equipement':
        this.equipementService.update(id, formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Updated!', `${this.tableType} has been updated successfully.`, 'success');
        });
        break;
      case 'Ticket':
        this.ticketService.update(id, formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Updated!', `${this.tableType} has been updated successfully.`, 'success');
        });
        break;
      case 'Departement':
        this.departementService.update(id, formData).subscribe(() => {
          this.loadTableData();
          Swal.fire('Updated!', `${this.tableType} has been updated successfully.`, 'success');
        });
        break;
    }
  }

  editEntity(entity: any, content: any): void {
    this.form.patchValue(entity);
    this.isEditing = true;
    this.currentEntityId = entity.id;  
    this.modalService.open(content);
  }

  deleteEntity(entity: any): void {
    let entityId: number;

    switch (this.tableType) {
        case 'Equipement':
            entityId = entity.serie;
            break;
        default:
            entityId = entity.id;
            break;
    }

    if (!entityId) {
        console.error('Entity ID is undefined or null');
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete this ${this.tableType}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            switch (this.tableType) {
                case 'Users':
                    this.userService.delete(entityId).subscribe(() => {
                        this.loadTableData();
                        Swal.fire('Deleted!', `${this.tableType} has been deleted successfully.`, 'success');
                    });
                    break;
                case 'Equipement':
                    this.equipementService.delete(entityId).subscribe(() => {
                        this.loadTableData();
                        Swal.fire('Deleted!', `${this.tableType} has been deleted successfully.`, 'success');
                    });
                    break;
                case 'Ticket':
                    this.ticketService.delete(entityId).subscribe(() => {
                        this.loadTableData();
                        Swal.fire('Deleted!', `${this.tableType} has been deleted successfully.`, 'success');
                    });
                    break;
                case 'Departement':
                    this.departementService.delete(entityId).subscribe(() => {
                        this.loadTableData();
                        Swal.fire('Deleted!', `${this.tableType} has been deleted successfully.`, 'success');
                    });
                    break;
            }
        }
    });
}

}
