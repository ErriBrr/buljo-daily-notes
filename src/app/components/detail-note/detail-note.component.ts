import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import { Note } from '../../interfaces/note';
import { BuljoLine } from '../../interfaces/buljo-line';
import { DailyNoteService } from '../../services/daily-note.service';
import { NoteService } from '../../services/note.service';
import { BuljoNoteService } from '../../services/buljo-note.service';
import { DictSvg } from '../../interfaces/dict';


@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.css']
})
export class DetailNoteComponent implements OnInit {

  @Input() inputNote?: Note;
  @Input() isNotesView!: boolean;
  detailNote: Note | undefined;

  getNote(input: Note): void {
    const date = input.date.toDateString();
    // console.log(date);
    this.noteService.getNote(date).subscribe(n => this.detailNote = n);
  }

  formatDate(note: Note): string {
    return this.dailyNoteService.formatDate(note.date);
  }

  isTodayNote(note: Note): boolean {
    return this.isNotesView && this.dailyNoteService.isTodayNote(note);
  }

  buljoLines(noteText: string): BuljoLine[] {
    return  this.buljoNoteService.generateBuljoLines(noteText);
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
    }

  ngOnInit(): void {
    if(this.inputNote) {
      this.getNote(this.inputNote);
    }
  }

}
