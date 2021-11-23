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
  private idsList : string[] = [];

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

  private generateId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  private askId(): string {
    let id = '';
    while (this.idsList.includes(id)) {
      id = this.generateId(10);
    }
    this.idsList.push(id);
    return id;
  }

  getLocalStorageNotes(): void {
    this.idsList = [];
    this.idsList.push('');
    this.notes = this.localStorageService.get('notes')!.map(item => item = {
      id: this.askId(),
      title: item.title,
      date: new Date(item.date),
      archive: item.archive,
      text: item.text
    });
  }

  pushNewNote(date: Date): string {
    const id = this.askId();
    const note: Note = {
      id: id,
      title: '',
      date: date,
      archive: false,
      text: ''
    };
    this.notes.push(note);
    this.localStorageService.set('notes', this.notes);
    return id;
  }

  majNote(): void {
    this.localStorageService.set('notes', this.notes);
  }

  createNewTodayNote(): string {
    const today = new Date();
    let id: string = '0000000000';
    if ( this.notes == []) { 
      id = this.pushNewNote(today);
    } else if (!this.notes.some(e => e.date.toDateString() === today.toDateString())) {
      id = this.pushNewNote(today);
    }
    return id;
  }

  getNoteById(id: string): Observable<Note> {
    if (id==='plus') {
      id = this.createNewTodayNote();
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
