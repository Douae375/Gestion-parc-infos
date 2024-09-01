import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() tableSelected = new EventEmitter<string>();

  selectTable(table: string) {
    this.tableSelected.emit(table);
  }
}
