import { AuthResponse } from '../schemas/dto/response/auth.response';
import { AuthModel } from '../schemas/model/auth.model';

export interface InterfaceAuthRepository {
  register: (auth: AuthModel) => Promise<AuthResponse | null>;
}
