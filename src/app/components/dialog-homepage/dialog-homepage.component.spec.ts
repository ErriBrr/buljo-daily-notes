import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHomepageComponent } from './dialog-homepage.component';

describe('DialogHomepageComponent', () => {
  let component: DialogHomepageComponent;
  let fixture: ComponentFixture<DialogHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
