import { Component, OnInit } from '@angular/core';
import { ExportCsvService } from '../export-csv.service';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.css']
})
export class ToolbarButtonsComponent implements OnInit {
  exportCsvToFile(): void {
    let notesToExport:Note[] = [];
    this.noteService.getNotes().subscribe(notes => notesToExport = notes)
    this.exportCsvService.exportCSV(notesToExport);
  }
  
  constructor(
    private exportCsvService: ExportCsvService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

}
