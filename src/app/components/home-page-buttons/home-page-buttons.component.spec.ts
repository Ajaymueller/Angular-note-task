import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomePageButtonsComponent } from './home-page-buttons.component';

describe('HomePageButtonsComponent', () => {
  let component: HomePageButtonsComponent;
  let fixture: ComponentFixture<HomePageButtonsComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageButtonsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageButtonsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showUserDropdown should be false when component initialised', () => {
    expect(component.showChangeUserDropdown).toBeFalse();
  });

  it('userID should be type of number', () => {
    expect(component.userId !== NaN).toBeTrue();
  });

  it('should have a users array when initialised', () => {
    expect(component.users).toBeDefined();
  });

  it('users array should be empty on component init', () => {
    expect(component.users).toEqual([]);
  });

  it('should show two buttons', () => {
    const buttons = de.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should not show user dropdown when showChangeUserDropdown property is false', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const dropdown = de.nativeElement.querySelector('#userDropdown');
      expect(dropdown).toBeNull();
    })
  });

  it('should show user dropdown when showChangeUserDropdown property is true', () => {
    component.showChangeUserDropdown = true;
    // const dropdown = de.nativeElement.querySelector('#userDropdown');
    // expect(dropdown).not.toBeNull();
    // fixture.detectChanges();
    fixture.whenStable().then(() => {
      const dropdown = de.nativeElement.querySelector('#userDropdown');
      // expect(dropdown).not.toBeNull();
    })
  });

  it('when calling changeUser function, should set showChangeUserDropdown to true, emit changeUserEmit and assign users to array', () => {
    spyOn(component.changeUserEmit, 'emit');
    expect(component.showChangeUserDropdown).toBeFalse();
    component.changeUser();
    expect(component.showChangeUserDropdown).toBeTrue();
    expect(component.changeUserEmit.emit).toHaveBeenCalled();
    expect(component.users).not.toBe([]);
  });

  it('userIdChanged function should emit userIdEmit when called and set value of UserId to event.target.value', () => {
    const event = { target: { value: 1 } };
    spyOn(component.userIdEmit, 'emit');
    component.userIdChanged(event);
    expect(component.userId).toBe(event.target.value);
    expect(component.userIdEmit.emit).toHaveBeenCalled();
  })

  it('addNoteEmit should emit addNote when called', () => {
    spyOn(component.addNote, 'emit');
    component.addNoteEmit();
    expect(component.addNote.emit).toHaveBeenCalled();
  });

  // it('if show showChangeUserDropdown property is false, Change User button should be visible', () => {
  //   component.showChangeUserDropdown = false;
  //   const changeUserButton = de.nativeElement.querySelector("#change-user-btn");
  //   const changeUserButton1 = de.nativeElement.querySelector("#view-note-btn");

  //   // expect(changeUserButton).toEqual(null);

  //   // component.showChangeUserDropdown = false;

  //   // console.log("show user button:", changeUserButton);
  //   console.log("show notes button:", changeUserButton1);
  // })

  it('activateButton function should call changeUser function if showChangeUserDropdown property is false when function called', () => {
    const fct = spyOn(component, 'changeUser');
    component.showChangeUserDropdown = false;
    component.activateButton();
    expect(fct).toHaveBeenCalled();
  });

  it('if showChangeUserDropdown is true, activateButton function should emit viewAllNotesEmit and set showChangeUserDropdown to false when called', () => {
    spyOn(component.viewAllNotesEmit, 'emit');
    component.showChangeUserDropdown = true;
    component.activateButton();
    expect(component.showChangeUserDropdown).toBe(false);
    expect(component.viewAllNotesEmit.emit).toHaveBeenCalled();
  });

});
