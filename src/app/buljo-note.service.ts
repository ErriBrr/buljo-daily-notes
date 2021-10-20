import { Injectable } from '@angular/core';

import { Svg } from './svg';
import { BuljoLine } from './buljo-line';
import { ICONS, MARK_UP_ARROW, MARK_UP_EXCLAMATION, 
  MARK_UP_ROUND, MARK_UP_ROUND_CHECK, MARK_UP_ROUND_FILL, MARK_UP_SMILEY, 
  MARK_UP_SQUARE, MARK_UP_SQUARE_FILL, MARK_UP_TRIANGLE } from './svg-icons';
import { RegexService } from './regex.service';

interface Color {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuljoNoteService {
  svgList(): Svg[] {
    return ICONS;
  }

  generateBuljoLines(text:string): BuljoLine[] {
    let buljoLines : BuljoLine[] = [];
    const splitText = text.replace('\r', '').split("\n");
    for (var i = 0; i < splitText.length; i++){
      let line = splitText[i];
      let buljoLine: BuljoLine = this.regexService.extractBuljoLine(line);
      switch(buljoLine.markup.color) {
        case 'b':
          buljoLine.markup.color = 'blue';
          break;
        case 'r':
          buljoLine.markup.color = 'red';
          break;
        case 'g':
          buljoLine.markup.color = 'lawngreen';
          break;
        case 'y':
          buljoLine.markup.color = 'yellow';
          break;
        case 'a':
          buljoLine.markup.color = 'aquamarine';
          break;
        case 'o':
          buljoLine.markup.color = 'orange';
          break;
        default:
          buljoLine.markup.color = 'black';
      }
      switch(buljoLine.markup.icon) {
        case MARK_UP_SQUARE: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SQUARE)!.name;
          break;
        }
        case MARK_UP_SQUARE_FILL: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SQUARE_FILL)!.name;
          break; 
        } 
        case MARK_UP_EXCLAMATION: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_EXCLAMATION)!.name;
          break;
        }
        case MARK_UP_TRIANGLE: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_TRIANGLE)!.name;
          break;
        }
        case MARK_UP_ARROW: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ARROW)!.name;
          break;
        }
        case MARK_UP_ROUND: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND)!.name;
          break;
        }
        case MARK_UP_ROUND_FILL: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND_FILL)!.name;
          break;
        }
        case MARK_UP_ROUND_CHECK: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND_CHECK)!.name;
          break;
        }
        case MARK_UP_SMILEY: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SMILEY)!.name;
          break;
        }
        default: {
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === 'default')!.name;
          break; 
        } 
     }
     buljoLines.push(buljoLine);
    }
    return buljoLines;
  };

  constructor(private regexService: RegexService) { }
}
