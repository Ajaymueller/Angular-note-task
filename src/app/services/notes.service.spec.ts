import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { mockNoteObject, mockNotesArray } from '../mocks/mockNotes.class';
import { NoteModel } from '../models/note-model.class';

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

        mockNotes = mockNotesArray as Array<NoteModel>;
        mockNote = mockNoteObject as NoteModel;
    });

    it('should get all notes when getAll is called', (done: DoneFn) => {
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

    it('should update a note when updateNote is called', (done: DoneFn) => {
        httpClientSpy.put.and.returnValue(of(mockNote));
        mockNote.title = "test update note";

        noteDataService.updateNote(mockNote, mockNote.id).subscribe((note) => {
            expect(note).toBeDefined();
            expect(note).toEqual(mockNote);
            done();
        }, 
        (error => {
            fail(error.message);
        }));
        expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
    });

    it('should add a note when addNote is called', (done: DoneFn) => {
        const newNote = {
            id: 10,
            title: "new note",
            body: "new note body",
            userId: 5,
        } as NoteModel;

        httpClientSpy.post.and.returnValue(of(newNote));

        noteDataService.addNote(newNote).subscribe((note)=> {
            expect(note).toBeDefined();
            expect(note).toEqual(newNote);
            done();
        }, 
        (error) => {
            fail(error.message);
        })
        expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    });

    it('delete should call http delete method', () => {
        httpClientSpy.delete.and.returnValue(of(true));
        let mockNotes = mockNotesArray;

        noteDataService.deleteNote(mockNotes[0].id).subscribe((note) => {
        });

        expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    });

    it('getNoteByUserId should send a Get request for a single note', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of(mockNote));

        noteDataService.getNoteByUserId(mockNote.id).subscribe((note) => {
            expect(note).toBeDefined();
            expect(note).toEqual(mockNote);
            done();
        }, 
        (error) => {
            fail(error.message);
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
});
