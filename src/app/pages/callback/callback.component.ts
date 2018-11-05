import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/_services';


@Component({
  selector: 'rez-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) {
    // Check for authentication and handle if hash present
    auth.handleAuth();
  }

  ngOnInit() {
  }

}
