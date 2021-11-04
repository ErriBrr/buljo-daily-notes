import { Injectable } from '@angular/core';

import { Note } from '../interfaces/note';

import { saveAs } from 'file-saver';
import { unparse, parse } from 'papaparse';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExportCsvService {
  private localStorageService = new LocalStorageService;

  exportCSV(notes: Note[]): void {
    // const text = JSON.stringify(notes).replace(/},{/g, "},\n{");
    var csv_data = unparse(notes, {
      delimiter: ";",
      newline: "\n"
    });
    var fileObj = new File([csv_data], 'sample_file.csv', {'type': 'text/csv'});
    saveAs(fileObj);
  }

  addToLocalStorage(csvJson: any[]) {
    let notesJson: Note[];
    notesJson = csvJson.map(e => e = {
      title: e['title'],
      date: e['date'],
      archive: e['archive'],
      text: e['text']
    });
    this.localStorageService.add('notes', notesJson);
  }

  importCSV(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvJson: any[] = parse(reader.result!.toString(), {
        delimiter: ";",
        newline: "\n",
        header: true
      }).data;
      this.addToLocalStorage(csvJson);
    }
    reader.readAsText(file);
  }

  constructor() { }
}
