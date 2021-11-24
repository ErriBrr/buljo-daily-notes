import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Note } from '../interfaces/note';
import { LocalStorageService } from './local-storage.service';
import { ImportExportCsvService } from './importexport-csv.service';
import { IdsService } from './ids.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
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

  getLocalStorageNotes(): void {
    this.idsList = [];
    this.idsList.push('');
    this.notes = this.localStorageService.get('notes')!.map(item => item = {
      id: item.id,
      title: item.title,
      date: new Date(item.date),
      archive: item.archive,
      text: item.text
    });
  }

  pushNewNote(date: Date): string {
    const id = this.idsService.askId();
    const note: Note = {
      id: id,
      title: '',
      date: date,
      archive: false,
      text: ''
    };
    this.notes = this.notes.reverse();
    this.notes.push(note);
    this.notes = this.notes.reverse();
    this.localStorageService.set('notes', this.notes);
    return id;
  }

  majNote(): void {
    this.localStorageService.set('notes', this.notes);
  }

  isActiveTodayNote(e: Note, today: Date): boolean {
    return e.date.toDateString() === today.toDateString() && !e.archive;
  }

  createNewTodayNote(): string {
    const today = new Date();
    let id: string;
    if ( this.notes == []) { 
      id = this.pushNewNote(today);
    } else {
      if (!this.notes.some(e => this.isActiveTodayNote(e, today))) {
        id = this.pushNewNote(today);
      } else {
        id = this.notes.find(e => this.isActiveTodayNote(e, today))?.id!;
      }
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

  constructor(
    private localStorageService: LocalStorageService,
    private importexportCsvService: ImportExportCsvService,
    private idsService: IdsService
  ) { }
}
