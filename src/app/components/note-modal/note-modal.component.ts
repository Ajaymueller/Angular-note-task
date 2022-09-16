import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteModel } from 'src/app/models/note-model.class';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {

  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() noteToBeAdded: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
  @Output() noteToBeUpdated: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
  @Input() note: NoteModel = new NoteModel;
  @Input() isAddNewNote: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.setIsAddNote();
  };

  setIsAddNote() {
    if (this.note.title === null && this.note.body === '') {
      this.isAddNewNote = true;
    } else {
      this.isAddNewNote = false;
    }
  }

  closeModal() {
    if (!this.isAddNewNote) {
      this.emitNoteToBeUpdated();
      this.success.emit(true);
    }
    this.success.emit(true);
  }

  emitNoteToBeAdded() {
    this.noteToBeAdded.emit(this.note);
  }

  emitNoteToBeUpdated() {
    this.noteToBeUpdated.emit(this.note);
  }

}
