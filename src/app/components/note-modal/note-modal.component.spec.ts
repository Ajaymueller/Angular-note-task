import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteModalComponent } from './note-modal.component';
import { DebugElement } from '@angular/core';
import { mockNoteObject } from 'src/app/mocks/mockNotes.class';
import { NoteModel } from 'src/app/models/note-model.class';

describe('NoteModalComponent', () => {
  let component: NoteModalComponent;
  let fixture: ComponentFixture<NoteModalComponent>;
  let de: DebugElement;
  let mockNote;

  beforeEach(async () => {
    mockNote = mockNoteObject as NoteModel;

    await TestBed.configureTestingModule({
      declarations: [NoteModalComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteModalComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on click of the create note button should call emitNoteToBeAdded', () => {
    spyOn(component, 'emitNoteToBeAdded');
    component.isAddNewNote = true;
    component.note = mockNote;
    const createButton = de.nativeElement.querySelector('#create-note-btn');
    fixture.whenStable().then(() => {
      createButton.click();
      expect(component.noteToBeAdded.emit).toHaveBeenCalled();
    })
  });

  it('on click of the close modal button should call closeModal', () => {
    spyOn(component, 'closeModal');
    const createButton = de.nativeElement.querySelector('#close-modal-btn');
    createButton.click();
    fixture.whenStable().then(() => {
      expect(component.closeModal).toHaveBeenCalled();
    })
  });

  it('closeModal function should call emitNoteToBeUpdated and emit Success if isAddNewNote Property is false', () => {
    spyOn(component.success, 'emit');
    spyOn(component, 'emitNoteToBeUpdated');
    component.isAddNewNote = false;
    component.closeModal();
    expect(component.emitNoteToBeUpdated).toHaveBeenCalled();
    expect(component.success.emit).toHaveBeenCalled();
  });

  it('emitNoteToBeUpdated function should emit noteToBeUpdated', () => {
    spyOn(component.noteToBeUpdated, 'emit');
    component.emitNoteToBeUpdated();
    expect(component.noteToBeUpdated.emit).toHaveBeenCalled();
  });

  it('emitNoteToBeAdded function should emit noteToBeAdded', () => {
    spyOn(component.noteToBeAdded, 'emit');
    component.emitNoteToBeAdded();
    expect(component.noteToBeAdded.emit).toHaveBeenCalled();
  });

  it('closeModal function should emit success if isAddNewNote Property is true', () => {
    spyOn(component.success, 'emit');
    component.isAddNewNote = true;
    component.closeModal();
    expect(component.success.emit).toHaveBeenCalled();
  });


});
