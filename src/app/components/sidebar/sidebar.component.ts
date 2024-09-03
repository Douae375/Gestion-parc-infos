import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule]
})
export class SidebarComponent {
  selectedTableType: string = 'Dashboard'; 

  @Output() tableSelected = new EventEmitter<string>();

  selectTable(table: string) {
    this.selectedTableType = table; 
    this.tableSelected.emit(table);
  }

  logout(): void {
    window.location.href = '/login'; 
  }
}
