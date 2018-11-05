import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rez-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.toggled.emit();
  }

}
