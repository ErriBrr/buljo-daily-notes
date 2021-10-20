import { Injectable } from '@angular/core';

import { BuljoLine } from '../interfaces/buljo-line';
import { DictSvg } from '../interfaces/dict';
import { ICONS } from '../constants/icons-svg';
import { COLORS } from '../constants/icons-colors';
import { RegexService } from './regex.service';

@Injectable({
  providedIn: 'root'
})
export class BuljoNoteService {
  svgList(): DictSvg {
    return ICONS;
  }

  private generateBuljoLine(line:string): BuljoLine {
    let buljoLine: BuljoLine = this.regexService.extractBuljoLine(line);
    // console.log(buljoLine.text + ' ' + buljoLine.markup.color + ' ' + buljoLine.markup.icon);
    buljoLine.markup.color = COLORS[buljoLine.markup.color];
    buljoLine.markup.icon = ICONS[buljoLine.markup.icon].name;
    return buljoLine;
  }

  generateBuljoLines(text:string): BuljoLine[] {
    let buljoLines : BuljoLine[] = [];
    const splitText = text.replace('\r', '').split("\n");
    for (var i = 0; i < splitText.length; i++){
      let line = splitText[i];
      buljoLines.push(this.generateBuljoLine(line));
    }
    return buljoLines;
  };

  constructor(private regexService: RegexService) { }
}
