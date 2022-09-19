import { Education } from "./Education";
import { Work } from "./Work";

export interface Account{

  uuid: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: Date;
  biography: string;
  isPublic: boolean;
  followingCount: number;
  followersCount: number;
  education: Education[];
  workExperience: Work[];
}