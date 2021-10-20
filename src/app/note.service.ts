import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Note } from './note';
import { NOTES } from './mock-notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  getNotes(): Observable<Note[]> {
    const notes = of(NOTES);
    return notes;
  }

  pushNewNote(date: Date): void {
    const note: Note = {
      title: '',
      date: date,
      archive: false,
      text: ''
    };
    NOTES.push(note);
  }

  createNewTodayNote(): void {
    const today = new Date();
    if ( !NOTES.some(e => e.date.toDateString() === today.toDateString()) ) {
      this.pushNewNote(today);
    }
  }

  getNote(date: string): Observable<Note> {
    if (date === new Date().toDateString()) {
      this.createNewTodayNote();
    }
    const note = NOTES.find(n => n.date.toDateString() === date)!;
    return of(note);
  }

  constructor() { }
}
