export interface User {
  id: number;
  username: string;
  password: string;
  status: 'active' | 'inactive';
  roleId: number;
  firstname: string;
  lastname: string;
  roleName?: string;
  firstLogin: boolean;
  loginToken: string;
}
