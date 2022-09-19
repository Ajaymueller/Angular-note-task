import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewUpdateNoteComponent } from './mobile-view-update-note.component';

describe('MobileViewUpdateNoteComponent', () => {
  let component: MobileViewUpdateNoteComponent;
  let fixture: ComponentFixture<MobileViewUpdateNoteComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileViewUpdateNoteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileViewUpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should emit noteDeleted when deleteNote is called', () => {
    spyOn(component.noteDeleted, 'emit');
    component.deleteNote();
    expect(component.noteDeleted.emit).toHaveBeenCalled();
  });

  xit('should emit noteUpdated when updateNote is called', () => {
    spyOn(component.noteUpdated, 'emit');
    component.updateNote();
    expect(component.noteUpdated.emit).toHaveBeenCalled();
  });

  xit('should call updateNote on click of update note button', () => {
    spyOn(component, 'updateNote');
    const button = de.nativeElement.querySelector('#update-note-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.updateNote).toHaveBeenCalled();
    })
  });

  xit('should call deleteNote on click of delete note button', () => {
    spyOn(component, 'deleteNote');
    const button = de.nativeElement.querySelector('#delete-note-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.deleteNote).toHaveBeenCalled();
    })
  });

});
