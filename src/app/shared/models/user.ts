import { AdminLoginMaster } from "./adminloginMaster";
import { College } from "./college";

export class User {
  userId: number;
  firstName: string;
  username: string;
  password: string;
  seccondName: string;
  college: College = new College();
  skills: string;
  degree: string;
  branch: string;
  email: string;
  token: string;
  mobileNumber: string;
  mediaType: string;
  organization;
  description: string;
  qualification: string;
  designation: string;
  fileName: string;
  primaryImageUrl: string;
  adminLoginMaster = new AdminLoginMaster();
  address: string;
  city: string;
  state: string;
  pincode: string;
  role: { role };
}
