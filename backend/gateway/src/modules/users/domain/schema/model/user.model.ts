export interface UserModel {
  id_user?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  identification: string;
  token?: string;
}
