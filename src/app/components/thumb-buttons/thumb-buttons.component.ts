import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buttons',
  templateUrl: './thumb-buttons.component.html',
  styleUrls: ['./thumb-buttons.component.css']
})
export class ThumbButtonsComponent implements OnInit {
  @Input() type?: string;

  todayDate(): string {
    return new Date(Date.now()).toDateString();
  }  
  goBack(): void {
    this.location.back();
  }

  constructor(
    private location: Location
  ){ }

  ngOnInit(): void {
  }

}
