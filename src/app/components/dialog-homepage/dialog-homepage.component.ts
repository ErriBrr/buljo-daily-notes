import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BuljoLine } from 'src/app/interfaces/buljo-line';
import { DictSvg } from 'src/app/interfaces/dict';
import { Note } from 'src/app/interfaces/note';
import { BuljoNoteService } from 'src/app/services/buljo-note.service';

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

  getBuljoline(): BuljoLine {
    return this.buljoNoteService.generateBuljoLine(this.note.text);
  }

  constructor(
    private buljoNoteService: BuljoNoteService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    const icons: DictSvg = this.buljoNoteService.svgList();
    for (let e in icons ) {
      iconRegistry.addSvgIconLiteral(icons[e].name, sanitizer.bypassSecurityTrustHtml(icons[e].html));
    } 
  };

  ngOnInit(): void {
  }

}
