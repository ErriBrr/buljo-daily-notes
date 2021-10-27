import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogHomepageComponent } from './components/dialog-homepage/dialog-homepage.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Buljo daily notes';
  constructor(public dialog: MatDialog) {}
  
  openDialog() {
    this.dialog.open(DialogHomepageComponent);
  }
  
  ngOnInit(): void {
    this.openDialog();
  }
}
