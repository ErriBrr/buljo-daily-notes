import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { unparse, parse } from 'papaparse';

import { Note } from '../interfaces/note';
import { LocalStorageService } from './local-storage.service';
import { IdsService } from './ids.service';

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
      _id: e['_id'] ? e['_id'] : this.idsService.askId(),
      title: e['title'],
      date: e['date'],
      archive: e['archive'],
      text: e['text']
    });
    this.localStorageService.add('notes', notesJson);
  }

  importCSV(file: File, callback: () => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const csvJson: any[] = parse(reader.result!.toString(), {
        delimiter: ";",
        newline: "\n",
        header: true,
        dynamicTyping: true
      }).data;
      this.addToLocalStorage(csvJson);
      callback();
    };
    reader.readAsText(file);
  }

  constructor(
    private idsService: IdsService
  ) { }
}
