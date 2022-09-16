import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class FilterComponent {

  @Output() searchValueEmit = new EventEmitter<string>();
  searchTerm: string = "";

  constructor() { }

  searchTermChanged(searchTerm) {
    this.searchTerm = searchTerm;
    this.searchValueEmit.emit(this.searchTerm);
  }

}
