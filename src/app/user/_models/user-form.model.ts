export class UserFormModel {
  constructor(
    public name: string,
    public given_name: string,
    public family_name: string,
    public prefix?: string,
    public middle_name?: string,
    public suffix?: string,
  ) { }
}
