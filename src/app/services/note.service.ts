import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Note } from '../interfaces/note';
import { LocalStorageService } from './local-storage.service';
import { ImportExportCsvService } from './importexport-csv.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private localStorageService = new LocalStorageService;
  private importexportCsvService = new ImportExportCsvService;
  private notes: Note[] = [];

  delete(note: Note): void {
    //this.notes = this.notes.filter(obj => obj !== note);
    // ALTERNATIVE :
    note.archive = true;
    this.majNote();
    //window.location.reload();
  }

  getNotes(): Observable<Note[]> {
    if (this.localStorageService.get('notes')){
      this.getLocalStorageNotes();
    }
    return of(this.notes);
  }

  getLocalStorageNotes(): void {
    let id : number = 0;
    this.notes = this.localStorageService.get('notes')!.map(item => item = {
      id: id++,
      title: item.title,
      date: new Date(item.date),
      archive: item.archive,
      text: item.text
    });
  }

  pushNewNote(date: Date): void {
    const note: Note = {
      title: '',
      date: date,
      archive: false,
      text: ''
    };
    this.notes.push(note);
    this.localStorageService.set('notes', this.notes);
  }

  majNote(): void {
    this.localStorageService.set('notes', this.notes);
  }

  createNewTodayNote(): void {
    const today = new Date();
    if ( this.notes == []) { 
      this.pushNewNote(today);
    } else if (!this.notes.some(e => e.date.toDateString() === today.toDateString())) {
      this.pushNewNote(today);
    }
  }

  getNoteById(id: number): Observable<Note> {
    if (!id) {
      this.createNewTodayNote();
    }
    const note = this.notes.find(n => n.id === id)!;
    return of(note);
  }

  getNoteByDate(date: string): Observable<Note> {
    if (date === new Date().toDateString()) {
      this.createNewTodayNote();
    }
    const note = this.notes.find(n => n.date.toDateString() === date)!;
    return of(note);
  }

  importNotes(file: File): void {
    this.importexportCsvService.importCSV(file, () => window.location.reload());
  }

  exportNotes(): void {
    this.getLocalStorageNotes();
    this.importexportCsvService.exportCSV(this.notes);
  }

  constructor() { }
}
