import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { mockNoteObject, mockNotesArray } from '../mocks/mockNotes.class';

import { NoteDataService } from './notes.service';

describe('NoteDataService', () => {
    let noteDataService: NoteDataService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let mockNotes;
    let mockNote;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NoteDataService, {
                provide: HttpClient, useValue: httpClientSpy
            }],
        });

        noteDataService = TestBed.inject(NoteDataService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

        mockNotes = mockNotesArray;
        mockNote = mockNoteObject;
    });

    it('should get all notes', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of(mockNotes));
        noteDataService.getAll().subscribe({
            next: (notes) => {
                expect(notes).toEqual(mockNotes);
                done();
            },
            error: () => {
                done.fail();
            }
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should update a note', () => {
        let mockNote = mockNoteObject;
        httpClientSpy.put.and.returnValue(of(mockNote));

        expect(mockNote).toEqual(mockNote);
        mockNote.title = "test update note";

        noteDataService.updateNote(mockNote, mockNote.id).subscribe();
        expect(mockNote.title).toEqual('test update note');
        expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
    });

    it('should add a note', () => {
    });

    xit('delete should make a DELETE HTTP request with id appended to end of url', () => {
        noteDataService.deleteNote(1).subscribe(res => {
            expect(res).toBe(1)
        });
    });

    xit('getNoteByUserId should sent a Get request for a single note', (done: DoneFn) => {
        noteDataService.getNoteByUserId(1).subscribe(
            (note) => { expect(note).toBeDefined(); done(); }
        )
    });
});
