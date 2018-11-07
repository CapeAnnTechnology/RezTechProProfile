import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthService } from './../../shared/_services/auth.service';
import { UserService } from './../../shared/_services/user.service';
import { UtilsService } from './../../shared/_services/utils.service';
import { ProfileFormService } from './../../shared/_services/profile-form.service';

import { UserModel } from './../../shared/_models/user.model';
import { ProfileFormModel } from './../../shared/_models/profile-form.model';

// import { dateValidator } from './../../../core/forms/date.validator';

import {
	     GUESTS_REGEX,
	     DATE_REGEX,
	     TIME_REGEX,
	     stringsToDate
	    } from './../../shared/_factories/formUtils.factory';

@Component({
  selector: 'rez-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [ ProfileFormService ],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  @Input() profile: UserModel;
  isEdit: boolean;
  // FormBuilder form
  profileFormGroup: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  profileForm: ProfileFormModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitProfileObj: UserModel;
  submitProfileSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    public pfs: ProfileFormService,
    private router: Router
    ) { }

  ngOnInit() {
    this.formErrors = this.pfs.formErrors;
    this.isEdit = !!this.profile;
    this.submitBtnText = this.isEdit ? 'Update Profile' : 'Create Profile';
    // Set initial form data
    this.profileForm = this._setProfileForm();
    // console.log(this.profileForm);
    // Use FormBuilder to construct the form
    this._buildForm();
  }


  private _setProfileForm() {
    if (!this.isEdit) {
      // If creating a new profile, create new
      // ProfileFormModel with default null data
      return new ProfileFormModel(null, null, null, null, null, null );
    } else {
      // If editing existing profile, create new
      // ProfileFormModel from existing data
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
      return new ProfileFormModel(
        this.profile.user_metadata.name,
        this.profile.user_metadata.prefix,
        this.profile.user_metadata.given_name,
        this.profile.user_metadata.middle_name,
        this.profile.user_metadata.family_name,
        this.profile.user_metadata.suffix,
      );
    }
  }

  private _buildForm() {
    this.profileFormGroup = this.fb.group({
      name: [this.profileForm.name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      prefix: [this.profileForm.prefix, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      given_name: [this.profileForm.given_name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      middle_name: [this.profileForm.middle_name, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      family_name: [this.profileForm.family_name, [
        Validators.required,
        Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
      suffix: [this.profileForm.suffix, [
        // Validators.required,
        // Validators.minLength(this.pfs.textMin),
        Validators.maxLength(this.pfs.titleMax)
      ]],
    });
    // Set local property to eventForm datesGroup control
    // this.datesGroup = this.eventForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.profileFormGroup
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
      _markDirty(this.profileForm);
      // _markDirty(this.datesGroup);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.profileForm) { return; }
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

    console.log(this.formErrors);

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // if (field !== 'datesGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.profileFormGroup.get(field), this.formErrors, field);
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
    return new UserModel(
      this.profileForm.get('name').value,
      this.profileForm.get('prefix').value,
      this.profileForm.get('given_name').value,
      this.profileForm.get('middle_name').value,
      this.profileForm.get('family_name').value,
      this.profileForm.get('suffix').value,
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitProfileObj = this._getSubmitObj();

    // if (!this.isEdit) {
    //   this.submitEventSub = this.api
    //     .postEvent$(this.submitEventObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // } else {
    //   this.submitEventSub = this.api
    //     .editEvent$(this.event._id, this.submitEventObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(['/event', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.profileFormGroup.reset();
  }

  ngOnDestroy() {
    if (this.submitEventSub) {
      this.submitEventSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }


}
