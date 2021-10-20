import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { DailyNoteService } from '../daily-note.service';

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

  constructor(
    private noteService: NoteService,
    private dailyNoteService: DailyNoteService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

}
