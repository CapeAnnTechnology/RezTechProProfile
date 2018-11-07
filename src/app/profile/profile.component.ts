import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { SocketService, UserService, UtilsService } from './../shared/_services';

import { ActivatedRoute } from '@angular/router';

import { UserModel } from './../shared/_models';

@Component({
  selector: 'rez-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel;
  pageTitle = 'User Profile';
  userSub: Subscription;
  routeSub: Subscription;
  loading: boolean;
  error: boolean;
  id: string;

  constructor(
  	private route: ActivatedRoute,
    private title: Title,
    private userService: UserService,
    public utils: UtilsService,
    ) { }

  ngOnInit() {
    this.title.setTitle( this.pageTitle );
    this._routeSubs();
  }

  private _routeSubs() {
    // Set user ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._getUser();
      });
  }

  private _getUser() {
    this.loading = true;
    // GET event by ID
    this.userSub = this.userService
      .getUser$()
      .subscribe(
        res => {
          this.id = res._id;
          this.user = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
