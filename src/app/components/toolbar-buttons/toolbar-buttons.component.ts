import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.css']
})
export class ToolbarButtonsComponent implements OnInit {
  exportCsvToFile(): void {
    this.noteService.exportNotes();
  }

  importFile(e: any) {
    if(e.target.files[0]) {
      this.noteService.importNotes(e.target.files[0]);
    }
  }
  
  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

}
