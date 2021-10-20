import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class DailyNoteService {
  isTodayNote(note: Note): boolean {
    const today = new Date(Date.now());
    const isToday = this.formatDate(note.date) === this.formatDate(today);
    // console.log(this.formatDate(note.date) + " === " + this.formatDate(today) + " -> " + isToday)
    return isToday;
  }

  formatDate(date: Date): string {
    return date.getDate() + '/' + ((date.getMonth() + 1)) + '/' + date.getFullYear();
  }

  constructor() { }
}
