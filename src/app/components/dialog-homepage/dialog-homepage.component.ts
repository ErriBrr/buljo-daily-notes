import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note';

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

  constructor() { }

  ngOnInit(): void {
  }

}
