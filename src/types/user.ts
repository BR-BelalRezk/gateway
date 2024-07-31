import { Role } from "./Role";
import { Branch } from "./branch";

export interface User {
  userId: string;
  userName: string;
  email: string;
  roles: string[];

  // fake
  branch: Branch
  branchId: number;
  image: string;
  role: Role;
  roleId: number;
}
