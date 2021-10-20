import { Injectable } from '@angular/core';
import { BuljoLine } from '../interfaces/buljo-line';
import { BuljoMarkup } from '../interfaces/buljo-markup';

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

  extractText(line:string): string {
    return line.replace(this.regexBuljoMarkup, '');
  }

  extractMarkUp(line:string): BuljoMarkup {
    let response = {
      color: 'default',
      icon: 'default'
    }
    const resultRegTest = this.regExecTest(line);
    if (resultRegTest) {
      response.color = resultRegTest[2];
      response.icon = resultRegTest[3];
    }
    return response;
  }
  
  extractBuljoLine(line:string): BuljoLine {
    return {
      markup: this.extractMarkUp(line),
      text: this.extractText(line)
    }
  }

  constructor() { }
}
