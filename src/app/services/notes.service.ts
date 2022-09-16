import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteModel } from '../models/note-model.class';

@Injectable({ providedIn: 'root' })
export class NoteDataService {
    url: string = "http://localhost:3000/notes"

    constructor(private http: HttpClient
    ) { }

    getAll(): Observable<NoteModel[]> { return this.http.get<NoteModel[]>(this.url); }

    getNoteByUserId(userId: Number): Observable<NoteModel[]> { return this.http.get<NoteModel[]>(`${this.url}?userId=${userId}`); }

    addNote(note: NoteModel) { return this.http.post<NoteModel>(this.url, note); }

    updateNote(note: NoteModel, id: number) { return this.http.put<NoteModel>(`${this.url}/${id}`, note); }

    deleteNote(id: Number): Observable<Number> { return this.http.delete<Number>(`${this.url}/${id}`); }
}