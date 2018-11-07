import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../../shared/_services/auth.service';
import { UserService } from './../../shared/_services/user.service';

import { UtilsService } from './../../shared/_services/utils.service';

import { UserModel } from './../../shared/_models/user.model';

@Component({
  selector: 'rez-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  pageTitle = 'Update Profile';

  routeSub: Subscription;
  profileSub: Subscription;
  profile: UserModel;
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
        this._getProfile();
      });
  }

  private _getProfile() {
    this.loading = true;
    // GET event by ID
    this.profileSub = this.userService
      .getUserById$(this._id)
      .subscribe(
        res => {
          // console.log(res);
          this.profile = res;
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
    this.profileSub.unsubscribe();
  }


}
