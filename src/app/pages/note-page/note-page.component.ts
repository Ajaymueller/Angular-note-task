import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoteModel } from 'src/app/models/note-model.class';
import { NoteQueryModel } from 'src/app/models/noteQuery-model.class';
import { NoteDataService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

  showModal: boolean = false;
  isUpdateNote: boolean = false;
  notes: Array<NoteModel> = new Array<NoteModel>();
  note: NoteModel = new NoteModel();
  noteQuery: NoteQueryModel = new NoteQueryModel;
  users: Array<Number> = new Array<Number>();
  searchTerm: string = "";
  error: string = null;
  subs: Subscription[] = [];

  constructor(private noteDataService: NoteDataService) { }

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.error = "";
    this.subs.push(
      this.noteDataService.getAll().subscribe(notes => {
        this.notes = notes;
        if (this.showModal) {
          this.showModal = false;
        };
        this.refreshQuery();
        this.getUsers();
      },
        error => {
          this.error = error.message;
        }));
  };

  deleteNote(note: NoteModel) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.subs.push(
        this.noteDataService.deleteNote(note.id).subscribe(() => {
          this.showModal = false;
          this.getAllNotes();
        },
          error => {
            this.error = error.message;
          })
      )
    }
  };

  updateNote(note: NoteModel) {
    this.subs.push(
      this.noteDataService.updateNote(note, note.id).subscribe(note => {
        this.note = note;
        this.getAllNotes();
      }, error => {
        this.error = error.message;
      }))
  };

  addNote(note: NoteModel) {
    this.subs.push(
      this.noteDataService.addNote(note).subscribe(note => {
        this.getAllNotes();
      }, error => {
        this.error = error.message;
      }))
  }

  getUsers() {
    this.notes.forEach(x => {
      this.users.push(x.userId);
    })
    this.users = Array.from(new Set(this.users));
  }

  refreshQuery() {
    this.noteQuery.userId = undefined;
  }

  closeModal() {
    if(this.isUpdateNote) {
      this.updateNote(this.note)
    };
  }

  isAddNote() {
    this.note = new NoteModel;
    this.showModal = true;
  }

  getNotesForUser(userId) {
    this.noteQuery.userId = userId;
    if (!isNaN(userId)) {
      this.subs.push(
      this.noteDataService.getNoteByUserId(this.noteQuery.userId).subscribe(notes => {
        this.notes = notes;
      }, error => {
        this.error = error.message;
      }));
    }
  }

  receiveNoteToDelete(note: NoteModel) {
    this.note = note;
    this.deleteNote(this.note);
  }

  receiveNoteToUpdate(note: NoteModel) {
    this.note = note;
    this.showModal = true;
    this.isUpdateNote = true;
  }

  receiveNoteToAdd(note: NoteModel) {
    this.note = note;
    this.addNote(this.note);
  }

  setSearchTerm(event) {
    this.searchTerm = event;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  };

}
