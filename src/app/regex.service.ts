import { Injectable } from '@angular/core';
import { BuljoLine } from './buljo-line';
import { BuljoMarkup } from './buljo-markup';
import { BuljoNoteService } from './buljo-note.service';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  private regexBuljoMarkup:RegExp = /^(([a-z]?)(\[\.\]|\[!\]|\[\]|\[\^\]|\->|\(\)|\(\.\)|\(x\)|\:\-\)))/;

  regExecTest(testNoteLine:string): RegExpExecArray | null {
    return this.regexBuljoMarkup.exec(testNoteLine);
  }
  regMatchTest(testNoteLine:string): RegExpMatchArray | null {
    return testNoteLine.match(this.regexBuljoMarkup);
  }

  extractBuljoLine(line:string): BuljoLine {
    return {
      markup: this.extractMarkUp(line),
      text: this.extractText(line)
    }
  }

  extractText(line:string): string {
    return line.replace(this.regexBuljoMarkup, '');
  }

  extractMarkUp(line:string): BuljoMarkup {
    let response = {
      color: '',
      icon: ''
    }
    const resultRegTest = this.regExecTest(line);
    if (resultRegTest) {
      response.color = resultRegTest[2];
      response.icon = resultRegTest[3];
    }
    return response;
  }

  constructor() { }
}