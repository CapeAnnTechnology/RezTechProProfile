import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../../shared/_services/auth.service';
import { UserService } from './../../shared/_services/user.service';

import { UtilsService } from './../../shared/_services/utils.service';

import { UserModel, UserMetaModel } from './../../shared/_models/user.model';

@Component({
  selector: 'rez-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  pageTitle = 'Update User';

  routeSub: Subscription;
  userSub: Subscription;
  user: UserModel;
  loading: boolean;
  error: boolean;
  private _id: string;

  constructor(
      private route: ActivatedRoute,
      private title: Title,
      private userService: UserService,
      public auth: AuthService,
      public utils: UtilsService,
  	) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);

  	    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getUser();
      });
  }

  private _getUser() {
    this.loading = true;
    // GET event by ID
    this.userSub = this.userService
      .getUserById$(this._id)
      .subscribe(
        res => {
          // console.log(res);
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
