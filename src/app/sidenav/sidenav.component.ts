import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from './../shared/_services';

@Component({
  selector: 'rez-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input()  opened: boolean;
  @Output() toggled = new EventEmitter<boolean>();

  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }

  toggle() {
    this.toggled.emit();
  }
}
