import { Injectable } from '@angular/core';

import { Note } from '../interfaces/note';

import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {
  exportCSV(notes: Note[]): void {
    // const text = JSON.stringify(notes).replace(/},{/g, "},\n{");
    var csv_data = unparse(notes, {
      delimiter: ";",
      newline: "\n"
    });
    var fileObj = new File([csv_data], 'sample_file.csv', {'type': 'text/csv'});
    saveAs(fileObj);
  }

  constructor() { }
}
