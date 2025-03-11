export interface AuthResponse {
  id_user?: number;
  first_name: string;
  last_name: string;
  email: string;
  access_token: string;
  refresh_token?: string;
  expire_at: number;
}
