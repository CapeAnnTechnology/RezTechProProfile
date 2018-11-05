import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rez-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  pageTitle = 'Help';

  constructor() { }

  ngOnInit() {
  }

}
