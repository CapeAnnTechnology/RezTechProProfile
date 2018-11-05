import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { environment } from './../../../environments/environment';
import { AUTH_CONFIG } from './../auth/auth.config';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  accessToken: string;
  userProfile: any;
  expiresAt: number;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggingIn: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isManager: boolean;
  isEmployee: boolean;
  isUser: boolean;
  roles: string[] = [];
  permissions: string[] = [];
  groups: string[] = [];

  // Subscribe to token expiration stream
  refreshSub: Subscription;

  constructor(private router: Router) {
    // If app auth token is not expired, request new token
    if (JSON.parse(localStorage.getItem('expires_at')) > Date.now()) {
      this.renewToken();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(['/']);
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    this.loggingIn = true;
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this._redirect();
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile?) {
    // If initial login, set profile and admin information
    this.expiresAt = (authResult.expiresIn * 1000) + Date.now();
    // Store expiration in local storage to access in constructor
    localStorage.setItem('expires_at', JSON.stringify(this.expiresAt));
    this.accessToken = authResult.accessToken;
    if (profile) {
      this.userProfile = profile;
      // console.log(profile);
      this.isAdmin = this._checkAdmin(profile);

      // Determine if Business Owner
      this.isOwner = this._checkOwner(profile);

      // Determine if Venue Manager
      this.isManager = this._checkManager(profile);

      // Determine if Employee
      this.isEmployee = this._checkEmployee(profile);

      this.isUser = (!this.isOwner)&&(!this.isManager)&&(!this.isEmployee);

      // context.idToken[namespace + "permissions"] = user.permissions;
      this.permissions = profile[AUTH_CONFIG.NAMESPACE+'/permissions'] || [];
      // context.idToken[namespace + "groups"] = user.groups;
      this.groups = profile[AUTH_CONFIG.NAMESPACE+'/groups'] || [];
      // context.idToken[namespace + "roles"] = user.roles;
      this.roles = profile[AUTH_CONFIG.NAMESPACE+'/roles'] || [];
    }else{
      this.isOwner = false;
      this.isManager = false;
      this.isEmployee = false;
      this.isUser = true;
    }
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    this.loggingIn = false;
    // Schedule access token renewal
    this.scheduleRenewal();
  }

  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE+'/roles'] || [];
    return roles.indexOf('admin') > -1;
  }

  private _checkOwner(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE+'/roles'] || [];
    // alert(roles);
    return roles.indexOf('owner') > -1;
  }

  private _checkManager(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE+'/roles'] || [];
    return roles.indexOf('manager') > -1;
  }

  private _checkEmployee(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE+'/roles'] || [];
    return roles.indexOf('employee') > -1;
  }

  private _clearExpiration() {
    // Remove token expiration from localStorage
    localStorage.removeItem('expires_at');
  }

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
    const redirectArr = fullRedirect.split('?tab=');
    const navArr = [redirectArr[0] || '/'];
    const tabObj = redirectArr[1] ? { queryParams: { tab: redirectArr[1] }} : null;

    // if Employee of single venue, redirect to rooms on login

    let navArrNew = navArr;

    if( this.isEmployee && !this.isManager && !this.isOwner ){
      // is only an employee
      // this.groups
      const employed = this.groups.filter((group) => group.startsWith("employee"));

      // console.log(employed);
      // if( '/' == navArr[0] || null == navArr[0] || undefined == navArr[0] ){
      // console.log(typeof(navArr));
      if ( typeof(navArr) != 'object' && navArr == 'null' ) {
        const venue = employed[0].split('|')[1];
        navArrNew = ['/venue',venue,'rooms'];
      }
    }

    // If venue has single room, redirect to room on login


    if (!tabObj) {
      this.router.navigate(navArrNew);
    } else {
      this.router.navigate(navArrNew, tabObj);
    }
    // Redirection completed; clear redirect from storage
    this._clearRedirect();
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem('authRedirect');
  }

  logout() {
    // Remove data from localStorage
    this._clearExpiration();
    this._clearRedirect();
    // End Auth0 authentication session
    this._auth0.logout({
      clientId: AUTH_CONFIG.CLIENT_ID,
      returnTo: environment.BASE_URI
    });
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    return Date.now() < JSON.parse(localStorage.getItem('expires_at'));
  }

  renewToken() {
    // Check for valid Auth0 session
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._getProfile(authResult);
      } else {
        this._clearExpiration();
      }
    });
  }

  scheduleRenewal() {
    // If last token is expired, do nothing
    if (!this.tokenValid) { return; }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresIn$ = of(this.expiresAt).pipe(
      mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expires - now));
        }
      )
    );

    this.refreshSub = expiresIn$
      .subscribe(
        () => {
          this.renewToken();
          this.scheduleRenewal();
        }
      );
  }

  unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

}
