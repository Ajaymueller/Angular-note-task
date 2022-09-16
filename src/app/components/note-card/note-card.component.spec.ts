import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyFilterPipe } from 'src/app/pipes/filter-pipe.pipe';

import { NoteCardComponent } from './note-card.component';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let de: DebugElement;
  let mockNotes;

  beforeEach(async () => {
    mockNotes = [
      { id: 1, title: "test note", body: "test note body", userId: 0 },
      { id: 2, title: "test note 1", body: "test note body 1", userId: 1 }
    ];

    await TestBed.configureTestingModule({
      declarations: [NoteCardComponent, MyFilterPipe],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.notes = mockNotes;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on click of the note card should call emitCurrentNoteToModal', () => {
    const fct = spyOn(component, 'emitCurrentNoteToModal');
    const div = de.nativeElement.querySelector('#note-card-content');
    div.click();
    fixture.whenStable().then(() => {
      expect(fct).toHaveBeenCalled();
    })
  });

  it('on click of the delete icon should call emitNoteToDelete', () => {
    const fct = spyOn(component, 'emitNoteToDelete');
    const deleteButton = de.nativeElement.querySelector('#delete-button-id');
    deleteButton.click();
    fixture.whenStable().then(() => {
      expect(fct).toHaveBeenCalled();
    })
  });

  it('emitNotToDelete function should emit noteToDelete', () => {
    spyOn(component.noteToDelete, 'emit');

    component.emitNoteToDelete(mockNotes[1]);

    expect(component.noteToDelete.emit).toHaveBeenCalled();
  });

  it('emitCurrentNoteToModal function should emit noteToEdit', () => {
    spyOn(component.noteToEdit, 'emit');

    component.emitCurrentNoteToModal(mockNotes[1]);

    expect(component.noteToEdit.emit).toHaveBeenCalled();
  });

});
