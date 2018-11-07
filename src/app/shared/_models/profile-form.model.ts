export class ProfileFormModel {
  constructor(
    public name: string,
    public prefix?: string,
    public given_name: string,
    public middle_name: string,
    public family_name: string,
    public suffix?: boolean,
  ) { }
}
