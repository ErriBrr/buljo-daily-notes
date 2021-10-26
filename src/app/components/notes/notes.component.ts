import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { DailyNoteService } from '../../services/daily-note.service';
import { BuljoNoteService } from 'src/app/services/buljo-note.service';
import { BuljoLine } from 'src/app/interfaces/buljo-line';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  notes: Note[] = [] ;
  selectedNote?: Note;
  onSelect(note: Note): void {
    this.selectedNote = note;
  }
  getNotes(): void {
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }

  formatDate(note: Note): string {
    return this.dailyNoteService.formatDate(note.date);
  }

  isTodayNote(note: Note): boolean {
    return this.dailyNoteService.isTodayNote(note);
  }

  buljoLines(noteText: string): BuljoLine[] {
    return  this.buljoNoteService.generateBuljoLines(noteText);
  }

  constructor(
    private noteService: NoteService,
    private dailyNoteService: DailyNoteService,
    private buljoNoteService: BuljoNoteService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

}
