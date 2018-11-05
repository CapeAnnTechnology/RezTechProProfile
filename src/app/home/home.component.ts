import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AuthService, UtilsService } from './../shared/_services';

@Component({
  selector: 'rez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Dashboard';
  loading: boolean = true;
  error: boolean;

  constructor(
    private title: Title,
    public auth: AuthService,
    public utils: UtilsService,
   ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);    
    this.loading = false;
  }

}
