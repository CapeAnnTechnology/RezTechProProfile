import { Injectable } from '@angular/core';

@Injectable()
export class UserFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    name: '',
    prefix: '',
    given_name: '',
    middle_name: '',
    family_name: '',
    suffix: '',
  };
  // Min/maxlength validation
  textMin = 2;
  titleMax = 36;
  locMax = 200;
  dateMax = 10;
  timeMax = 8;
  descMax = 2000;
  // Formats
  dateFormat = 'm/d/yyyy';
  timeFormat = 'h:mm AM/PM';

  constructor() {
    this.validationMessages = {
      name: {
        required: `Name is <strong>required</strong>.`,
        minlength: `Name must be ${this.textMin} characters or more.`,
        maxlength: `Name must be ${this.titleMax} characters or less.`
      },
      prefix: {
        required: `Prefix is <strong>required</strong>.`,
        minlength: `Prefix must be ${this.textMin} characters or more.`,
        maxlength: `Prefix must be ${this.titleMax} characters or less.`
      },
      given_name: {
        required: `Given Name is <strong>required</strong>.`,
        minlength: `Given Name must be ${this.textMin} characters or more.`,
        maxlength: `Given Name must be ${this.titleMax} characters or less.`
      },
      middle_name: {
        required: `Middle Name is <strong>required</strong>.`,
        minlength: `Middle Name must be ${this.textMin} characters or more.`,
        maxlength: `Middle Name must be ${this.titleMax} characters or less.`
      },
      family_name: {
        required: `Last Name is <strong>required</strong>.`,
        minlength: `Last Name must be ${this.textMin} characters or more.`,
        maxlength: `Last Name must be ${this.titleMax} characters or less.`
      },
      suffix: {
        required: `Suffix is <strong>required</strong>.`,
        minlength: `Suffix must be ${this.textMin} characters or more.`,
        maxlength: `Suffix must be ${this.titleMax} characters or less.`
      },
    };
  }

}