import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noteService.getNoteById(id).subscribe(note => this.note = note);
  }

  majNote(): void {
    this.noteService.majNote();
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
    private dailyNoteService: DailyNoteService
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

}
