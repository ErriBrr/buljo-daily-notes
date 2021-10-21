import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ExportCsvService } from '../../services/export-csv.service';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';

const BI_PLUS_CIRCLE = `
<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"  fill="none"/>
<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
`;

const THUMBUP_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
      `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
      `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: 'app-buttons',
  templateUrl: './thumb-buttons.component.html',
  styleUrls: ['./thumb-buttons.component.css']
})
export class ThumbButtonsComponent implements OnInit {

  todayDate(): string {
    return new Date(Date.now()).toDateString();
  }

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIconLiteral('bi-plus-circle', sanitizer.bypassSecurityTrustHtml(BI_PLUS_CIRCLE));
   }

  ngOnInit(): void {
  }

}
