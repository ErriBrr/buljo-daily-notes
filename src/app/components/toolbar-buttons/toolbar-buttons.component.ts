import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.css']
})
export class ToolbarButtonsComponent implements OnInit {
  toggleControl = new FormControl(false);

  @Input()
  classNameCallback!: (isDarkMode: boolean) => void;
  
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
    this.toggleControl.valueChanges.subscribe((isDarkMode:boolean) => {
      this.classNameCallback(isDarkMode);
    });
  }

}
