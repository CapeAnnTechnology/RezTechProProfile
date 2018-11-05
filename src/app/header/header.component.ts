import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/_services';

@Component({
  selector: 'rez-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
