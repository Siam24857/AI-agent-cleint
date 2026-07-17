export interface User {
  id: string;
  fullname: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  skills?: string[];
  experience?: string[];
  education?: string[];
  isVerified?: boolean;
}
