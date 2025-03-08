import { LoginRequest } from '../../domain/schemas/dto/request/login.request';
import { RegisterRequest } from '../../domain/schemas/dto/request/register.request';
import { AuthResponse } from '../../domain/schemas/dto/response/auth.response';

export interface InterfaceAuthUseCaseService {
  login(loginRequest: LoginRequest): Promise<AuthResponse | null>;
  register(registerRequest: RegisterRequest): Promise<AuthResponse | null>;
}
