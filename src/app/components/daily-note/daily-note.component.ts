import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { DailyNoteService } from '../../services/daily-note.service';

@Component({
  selector: 'app-daily-note',
  templateUrl: './daily-note.component.html',
  styleUrls: ['./daily-note.component.css']
})
export class DailyNoteComponent implements OnInit {
  note: Note | undefined;

  getNote(): void {
    const date = String(this.route.snapshot.paramMap.get('date'));
    this.noteService.getNote(date).subscribe(note => this.note = note);
  }

  goBack(): void {
    this.noteService.majNote();
    this.location.back();
  }

  isTodayNote(note: Note): boolean {
    return this.dailyNoteService.isTodayNote(note);
  }

  formatDate(note: Note): string {
    return this.dailyNoteService.formatDate(note.date);
  }

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private dailyNoteService: DailyNoteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

}
