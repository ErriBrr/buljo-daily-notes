import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.css']
})
export class ToolbarButtonsComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput: any;
  
  exportCsvToFile(): void {
    this.noteService.exportNotes();
  }

  importCsvToFile(): void {
    this.fileInput.nativeElement.click();
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
