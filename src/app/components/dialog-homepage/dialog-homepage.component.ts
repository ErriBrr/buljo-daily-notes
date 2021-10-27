import { Component, OnInit } from '@angular/core';
import { BuljoLine } from 'src/app/interfaces/buljo-line';
import { Note } from 'src/app/interfaces/note';
import { BuljoNoteService } from 'src/app/services/buljo-note.service';

@Component({
  selector: 'app-dialog-homepage',
  templateUrl: './dialog-homepage.component.html',
  styleUrls: ['./dialog-homepage.component.css']
})
export class DialogHomepageComponent implements OnInit {
  note: Note = {
    title: '',
    text: '',
    archive: false,
    date: new Date()
  };

  getBuljoline(): BuljoLine {
    return this.buljoNoteService.generateBuljoLine(this.note.text);
  }

  constructor(private buljoNoteService: BuljoNoteService) { }

  ngOnInit(): void {
  }

}
