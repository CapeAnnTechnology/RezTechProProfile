import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rez-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean;

  ngOnInit(): void {
  }

  private initModel(): void {
  }

  onToggle() {
    this.opened = !this.opened;
  }
}
