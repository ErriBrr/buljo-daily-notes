import { TestBed } from '@angular/core/testing';

import { BuljoNoteService } from './buljo-note.service';

describe('BuljoNoteService', () => {
  let service: BuljoNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuljoNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
