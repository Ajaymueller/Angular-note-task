import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './note-filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchTermChanged function and emit searchValueEmit', () => {
    spyOn(component.searchValueEmit, 'emit');
    const searchTerm = "Test search term";
    component.searchTermChanged(searchTerm);
    expect(component.searchTerm).toEqual(component.searchTerm);
    expect(component.searchValueEmit.emit).toHaveBeenCalled();
  });

  it('searchTerm property should be empty string on init', () => {
    expect(component.searchTerm).toEqual("");
  });
});
