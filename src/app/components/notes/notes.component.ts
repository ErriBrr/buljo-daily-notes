import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { BuljoNoteService } from 'src/app/services/buljo-note.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DictSvg } from 'src/app/interfaces/dict';

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
  getActiveNotes(): Note[] {
    // return this.notes.filter(e => !e.archive).reverse();
    return this.notes;
  }

  constructor(
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
