import { IntUser } from "src/user/interface/user.interface";
export interface Iadmin extends IntUser {
  email: string;
  password: string;
  
}
