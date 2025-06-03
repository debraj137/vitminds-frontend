import { LongDateFormatKey } from "moment";

export class Organization {
  id: number;
  name: String;
  code: String;
  aboutInstitute: String;
  primaryEmailId: String;
  mobileNo: String;
  secondaryEmailId: String;
  gst: String;
  website: String;
  startedYear: LongDateFormatKey;
  userType: String;
  active: Boolean;
}
