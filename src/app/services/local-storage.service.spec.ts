import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { Note } from '../interfaces/note';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get local Note', () => {
    const testDate = new Date();
    const testNotes: Note[] = [{
      title: "test",
      date: testDate,
      text: "ceci est un test",
      archive: false
    }];
    const testResult: any[] = [{
      title: "test",
      date: testDate.toISOString(),
      text: "ceci est un test",
      archive: false
    }];
    service.set('A', testNotes);
    expect(service.get('A')).toEqual(testResult);
  });
});
