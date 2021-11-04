import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';

// https://firstclassjs.com/persist-data-using-local-storage-and-angular/

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }
  get(key: string): Note[] | null {
    if (this.isLocalStorageSupported) {
      if (this.localStorage.getItem(key) != null) {
        return JSON.parse(this.localStorage.getItem(key)!);
      }
      return null;
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  add(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.set(key, this.get(key)?.concat(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
