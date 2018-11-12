import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthService } from './../../shared/_services/auth.service';
import { UserService } from './../../shared/_services/user.service';
import { UtilsService } from './../../shared/_services/utils.service';
import { UserFormService } from './../_services/user-form.service';

import { UserModel, UserMetaModel } from './../../shared/_models/user.model';
import { UserFormModel } from './../_models/user-form.model';

// import { dateValidator } from './../../../core/forms/date.validator';

import {
	     GUESTS_REGEX,
	     DATE_REGEX,
	     TIME_REGEX,
	     stringsToDate
	    } from './../../shared/_factories/formUtils.factory';

@Component({
  selector: 'rez-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [ UserFormService ],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  isEdit: boolean;
  // FormBuilder form
  userFormGroup: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  userForm: UserFormModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitUserObj: UserModel;
  submitUserSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    public pfs: UserFormService,
    private router: Router
    ) { }

  ngOnInit() {
    this.formErrors = this.pfs.formErrors;
    this.isEdit = !!this.user;
    this.submitBtnText = this.isEdit ? 'Update User' : 'Create User';
    // Set initial form data
    this.userForm = this._setUserForm();
    // console.log(this.userForm);
    // Use FormBuilder to construct the form
    this._buildForm();
  }


  private _setUserForm() {
    if (!this.isEdit) {
      // If creating a new user, create new
      // UserFormModel with default null data
      return new UserFormModel(null, null, null, null, null, null );
    } else {
      // If editing existing user, create new
      // UserFormModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM

      // public _id: string,
      // public name: string,
      // public prefix?: string,
      // public given_name: string,
      // public middle_name: string,
      // public family_name: string,
      // public suffix?: boolean,

      // const _shortDate = 'M/d/yyyy';
      return new UserFormModel(
        this.user.user_metadata.name,
        this.user.user_metadata.given_name,
        this.user.user_metadata.family_name,
        this.user.user_metadata.prefix,
        this.user.user_metadata.middle_name,
        this.user.user_metadata.suffix,
      );
    }
  }

  private _buildForm() {
    this.userFormGroup = this.fb.group({
      name: [this.userForm.name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      prefix: [this.userForm.prefix, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      given_name: [this.userForm.given_name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      middle_name: [this.userForm.middle_name, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      family_name: [this.userForm.family_name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      suffix: [this.userForm.suffix, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
    });
    // Set local property to eventForm datesGroup control
    // this.datesGroup = this.eventForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.userFormGroup
      .valueChanges
      .subscribe( data => this._onValueChanged() );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.userForm);
      // _markDirty(this.datesGroup);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.userForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.pfs.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // console.log(this.formErrors);

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // if (field !== 'datesGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.userFormGroup.get(field), this.formErrors, field);
        // } else {
        //   // Set errors for fields inside datesGroup
        //   const datesGroupErrors = this.formErrors['datesGroup'];
        //   for (const dateField in datesGroupErrors) {
        //     if (datesGroupErrors.hasOwnProperty(dateField)) {
        //       // Clear previous error message (if any)
        //       datesGroupErrors[dateField] = '';
        //       _setErrMsgs(this.datesGroup.get(dateField), datesGroupErrors, dateField);
        //     }
        //   }
        // }
      }
    }
  }

  private _getSubmitObj() {
    // const startDate = this.datesGroup.get('startDate').value;
    // const startTime = this.datesGroup.get('startTime').value;
    // const endDate = this.datesGroup.get('endDate').value;
    // const endTime = this.datesGroup.get('endTime').value;
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new UserModel for submission
    const user_metadata = new UserMetaModel(
      this.userFormGroup.get('name').value,
      this.userFormGroup.get('given_name').value,
      this.userFormGroup.get('family_name').value,
      this.userFormGroup.get('prefix').value,
      this.userFormGroup.get('middle_name').value,
      this.userFormGroup.get('suffix').value,
    );
// class UserModel {
//   constructor(
//     public client_id: string,
//     public email: string,
//     public certificates?: string[],
//     public user_metadata?: UserMetaModel,
//     public _id?: string, // _id is present if editing or returning from DB
//   ) { }
// }
    return new UserModel(
      this.user.client_id,
      this.user.email,
      this.user.certificates,
      user_metadata,
      this.user._id,
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitUserObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitUserSub = this.userService
        .postUser$(this.submitUserObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      console.log('Submitted');
      this.submitUserSub = this.userService
        .editUser$(this.user._id, this.submitUserObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(['/user']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.userFormGroup.reset();
  }

  ngOnDestroy() {
    if (this.submitUserSub) {
      this.submitUserSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }


}
