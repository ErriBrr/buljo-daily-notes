import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { BuljoNoteService } from 'src/app/services/buljo-note.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DictSvg } from 'src/app/interfaces/dict';
import { DailyNoteService } from 'src/app/services/daily-note.service';

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
  deleteNote(note: Note): void {
    this.noteService.delete(note);
  }
  
  formatDate(note: Note): string {
    return this.dailyNoteService.formatDate(note.date);
  }
  isTodayNote(note: Note): boolean {
    return this.dailyNoteService.isTodayNote(note);
  }

  constructor(
    private dailyNoteService: DailyNoteService,
    private noteService: NoteService,
    private buljoNoteService: BuljoNoteService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
    ) {
      const icons: DictSvg = this.buljoNoteService.svgList();
      for (let e in icons ) {
        iconRegistry.addSvgIconLiteral(icons[e].name, sanitizer.bypassSecurityTrustHtml(icons[e].html));
    }
  };

  ngOnInit(): void {
    this.getNotes();
  }
}
