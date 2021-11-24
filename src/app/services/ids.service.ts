import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdsService {
  private idsList: string[] = [];
  
  private generateId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }

  askId(): string {
    let id = '';
    while (this.idsList.includes(id)) {
      id = this.generateId(10);
    }
    this.idsList.push(id);
    return id;
  }

  constructor() { }
}
