import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { mockNotesArray, mockNoteObject } from 'src/app/mocks/mockNotes.class';
import { NoteModel } from 'src/app/models/note-model.class';
import { NoteDataService } from 'src/app/services/notes.service';

import { NotePageComponent } from './note-page.component';

describe('NotePageComponent', () => {
  let component: NotePageComponent;
  let fixture: ComponentFixture<NotePageComponent>;
  let mockNotes;
  let mockNote;
  let stubNoteService: jasmine.SpyObj<NoteDataService>;

  beforeEach(async () => {
    stubNoteService = jasmine.createSpyObj('NotesService', ['getAll', 'getNoteByUserId', 'addNote', 'updateNote', 'deleteNote']);

    mockNotes = mockNotesArray as Array<NoteModel>;
    mockNote = mockNoteObject as NoteModel;

    await TestBed.configureTestingModule({
      declarations: [NotePageComponent],
      providers: [{ provide: NoteDataService, useValue: stubNoteService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePageComponent);
    stubNoteService.getAll.and.returnValue(of(mockNotes));
    stubNoteService.updateNote.and.returnValue(of(mockNote));
    stubNoteService.addNote.and.returnValue(of(mockNote));
    stubNoteService.getNoteByUserId.and.returnValue(of(mockNotes));
    stubNoteService.deleteNote.and.returnValue(of());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllNotes on init and assign retrieved notes to notes property', () => {
    spyOn(component, 'getAllNotes');
    component.ngOnInit();

    expect(component.getAllNotes).toHaveBeenCalled();
    expect(component.notes.length).toBe(2);
  });

  it('getAllNotes should call getAll function from noteDataService', () => {
    component.getAllNotes();

    expect(stubNoteService.getAll).toHaveBeenCalled();
  });

  it('setSearchTerm function should set the searchTerm property', () => {
    expect(component.searchTerm).toEqual("");

    const searchTerm = "test";
    component.setSearchTerm(searchTerm);

    expect(component.searchTerm).toBe("test");
  });

  it('updateNote function should update the note passed into it', () => {
    component.note = mockNote;
    expect(component.note).toEqual(mockNote);

    mockNote.title = "test update note";
    component.updateNote(mockNote);

    expect(component.note).toEqual(mockNote);
  });

  it('updateNote function should call updateNote from the noteDataService', () => {
    component.updateNote(mockNote);

    expect(stubNoteService.updateNote).toHaveBeenCalled();
  });

  // it('deleteNote function should delete a note', () => {
  //   component.note = mockNote;
  //   component.deleteNote(mockNote);

  //   expect(component.note).toBeNull();
  // });

  it('addNote function should add a note', () => {
    component.notes = [];

    expect(component.notes.length).toEqual(0);
    component.addNote(mockNote);

    expect(component.notes.length).toEqual(2);
  });

  it('addNote function should call addNote from the noteDataService', () => {
    component.addNote(mockNote);

    expect(stubNoteService.addNote).toHaveBeenCalled();
  });

  it('closeModal function should set showModal property to false and call getAllNotes', () => {
    spyOn(component, "getAllNotes");

    component.showModal = true;
    component.closeModal();

    expect(component.showModal).toBeFalse();
    expect(component.getAllNotes).toHaveBeenCalled();
  });

  it('isAddNote function should set showModal property to true', () => {
    component.showModal = false;

    component.isAddNote();

    expect(component.showModal).toBeTrue();
  });

  it('receiveNoteToAdd function should set note property and call addNote function', () => {
    spyOn(component, "addNote");

    component.note = undefined;

    expect(component.note).toBeUndefined();

    component.receiveNoteToAdd(mockNote);

    expect(component.note).toEqual(mockNote);
    expect(component.addNote).toHaveBeenCalled();
  });

  it('receiveNoteToUpdate function should set note property, showModal to true, and call updateNote function', () => {
    spyOn(component, "updateNote");

    component.note = undefined;
    component.showModal = false;

    expect(component.note).toBeUndefined();
    expect(component.showModal).toBeFalse();

    component.receiveNoteToUpdate(mockNote);

    expect(component.note).toEqual(mockNote);
    expect(component.showModal).toBeTrue();
    expect(component.updateNote).toHaveBeenCalled();
  });

  it('receiveNoteToDelete function should set note property and call deleteNote function', () => {
    spyOn(component, "deleteNote");

    component.note = undefined;

    expect(component.note).toBeUndefined();

    component.receiveNoteToDelete(mockNote);

    expect(component.note).toEqual(mockNote);
    expect(component.deleteNote).toHaveBeenCalled();
  });
});
