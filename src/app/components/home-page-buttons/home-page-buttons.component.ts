import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-page-buttons',
  templateUrl: './home-page-buttons.component.html',
  styleUrls: ['./home-page-buttons.component.scss']
})
export class HomePageButtonsComponent {

  showChangeUserDropdown: boolean = false;
  userId: number;

  @Output() addNote: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeUserEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() viewAllNotesEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userIdEmit: EventEmitter<number> = new EventEmitter<number>();


  @Input() users: Array<Number> = new Array<Number>();

  constructor() { }

  addNoteEmit() {
    this.addNote.emit(true);
  };

  activateButton() {
    if (!this.showChangeUserDropdown) {
      this.changeUser();
    } else {
      this.viewAllNotesEmit.emit(true);
      this.showChangeUserDropdown = false;
    }
  };

  changeUser() {
    this.showChangeUserDropdown = true;
    this.changeUserEmit.emit(true);
    this.users = Array.from(new Set(this.users));
  };

  userIdChanged(event) {
    if (event.target.value !== 'Choose user') {
      this.userId = event.target.value;
      this.userIdEmit.emit(this.userId);
    }
  };

}
