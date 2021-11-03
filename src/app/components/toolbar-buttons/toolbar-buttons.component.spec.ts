import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu } from '@angular/material/menu';

import { ToolbarButtonsComponent } from './toolbar-buttons.component';

describe('ToolbarButtonsComponent', () => {
  let component: ToolbarButtonsComponent;
  let fixture: ComponentFixture<ToolbarButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarButtonsComponent ],
      providers: [
        { provide: MatMenu, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
