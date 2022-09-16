import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NoteModel } from 'src/app/models/note-model.class';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {

  @Input() notes: Array<NoteModel> = new Array<NoteModel>();
  @Input() searchTerm: string;
  @Output() noteToEdit: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
  @Output() noteToDelete: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();

  constructor() { }

  emitCurrentNoteToModal(note: NoteModel) {
    this.noteToEdit.emit(note);
  }

  emitNoteToDelete(note: NoteModel) {
    this.noteToDelete.emit(note);
  };

}
