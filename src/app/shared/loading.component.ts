import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rez-loading',
  template: `
    <img src="/assets/img/loading.svg">
  `,
  styles: [`
    :host {
      display: block;
    }
    img {
      display: block;
      margin: 20px auto;
      width: 50px;
    }
  `]
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
