import { Injectable } from '@angular/core';

import { Svg } from './svg';
import { BuljoLine } from './buljo-line';
import { ICONS, MARK_UP_ARROW, MARK_UP_EXCLAMATION, 
  MARK_UP_ROUND, MARK_UP_ROUND_CHECK, MARK_UP_ROUND_FILL, MARK_UP_SMILEY, 
  MARK_UP_SQUARE, MARK_UP_SQUARE_FILL, MARK_UP_TRIANGLE } from './svg-icons';
import { RegexService } from './regex.service';


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
      let buljoLine: BuljoLine = {
        markup: this.regexService.extractMarkUp(line),
        text: ''
      };
      switch(buljoLine.markup.color) {
        case 'b':
          buljoLine.markup.color = 'blue';
          break;
        case 'r':
          buljoLine.markup.color = 'red';
          break;
        case 'g':
          buljoLine.markup.color = 'green';
          break;
        case 'y':
          buljoLine.markup.color = 'yellow';
          break;
        case 'a':
          buljoLine.markup.color = 'aquamarine';
          break;
        default:
          buljoLine.markup.color = 'orange';
      }
      switch(buljoLine.markup.icon) {
        case MARK_UP_SQUARE: { 
          buljoLine.text = line.slice(2, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SQUARE)!.name;
          break;
        }
        case MARK_UP_SQUARE_FILL: { 
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SQUARE_FILL)!.name;
          break; 
        } 
        case MARK_UP_EXCLAMATION: {
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_EXCLAMATION)!.name;
          break;
        }
        case MARK_UP_TRIANGLE: {
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_TRIANGLE)!.name;
          break;
        }
        case MARK_UP_ARROW: {
          buljoLine.text = line.slice(2, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ARROW)!.name;
          break;
        }
        case MARK_UP_ROUND: {
          buljoLine.text = line.slice(2, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND)!.name;
          break;
        }
        case MARK_UP_ROUND_FILL: {
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND_FILL)!.name;
          break;
        }
        case MARK_UP_ROUND_CHECK: {
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_ROUND_CHECK)!.name;
          break;
        }
        case MARK_UP_SMILEY: {
          buljoLine.text = line.slice(3, line.length);
          buljoLine.markup.icon = ICONS.find(e => e.mark_up === MARK_UP_SMILEY)!.name;
          break;
        }
        default: { 
          buljoLine.text = " " + line;
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
