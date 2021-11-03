import { Component, OnInit } from '@angular/core';
import { ImportExportCsvService } from '../../services/importexport-csv.service';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.css']
})
export class ToolbarButtonsComponent implements OnInit {
  exportCsvToFile(): void {
    let notesToExport:Note[] = [];
    this.noteService.getNotes().subscribe(notes => notesToExport = notes)
    this.importexportCsvService.exportCSV(notesToExport);
  }

  importFile(e: any) {
    if(e.target.files[0]) {
      this.importexportCsvService.importCSV(e.target.files[0]);
    }
  }
  
  constructor(
    private importexportCsvService: ImportExportCsvService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

}
