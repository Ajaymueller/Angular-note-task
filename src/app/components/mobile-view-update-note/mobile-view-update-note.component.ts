import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteModel } from 'src/app/models/note-model.class';

@Component({
  selector: 'app-mobile-view-update-note',
  templateUrl: './mobile-view-update-note.component.html',
  styleUrls: ['./mobile-view-update-note.component.scss']
})
export class MobileViewUpdateNoteComponent {

  @Input() note: NoteModel = new NoteModel;
  @Output() noteUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() noteDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  deleteNote() {
    this.noteDeleted.emit(true);
  }

  updateNote() {
    this.noteUpdated.emit(true);
  }

}
