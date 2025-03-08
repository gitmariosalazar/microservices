import { Inject, Injectable } from '@nestjs/common';
import { InterfaceAuthUseCaseService } from '../usecases/auth.use-case.interface';
import { LoginRequest } from '../../domain/schemas/dto/request/login.request';
import { RegisterRequest } from '../../domain/schemas/dto/request/register.request';
import { AuthResponse } from '../../domain/schemas/dto/response/auth.response';
import { InterfaceUserRepository } from 'src/modules/users/domain/contracts/user.repository.interface';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { BadRequestException } from 'src/shared/errors/exception/BadRequestException';
import { CustomHttpException } from 'src/shared/errors/exception/CustomHttpException';
import { statusCode } from 'src/settings/environments/status-code';
import { AuthMapper } from '../mappers/auth.mapper';
import { InterfaceToken } from '../usecases/jwt.interface.token';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUseCaseService implements InterfaceAuthUseCaseService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: InterfaceUserRepository,
    @Inject('JwtService')
    private readonly jwtService: InterfaceToken,
  ) {}

  async login(loginRequest: LoginRequest): Promise<AuthResponse | null> {
    try {
      const requiredFields = ['email', 'password'];
      const missingFields = validateFields(loginRequest, requiredFields);

      if (missingFields.length > 0) {
        throw new BadRequestException(missingFields);
      }

      const user = await this.userRepository.findUserByEmail(
        loginRequest.email,
      );
      if (!user) {
        throw new CustomHttpException(
          'Invalid email or password',
          statusCode.UNAUTHORIZED,
        );
      }
      const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new CustomHttpException(
          'Invalid email or password',
          statusCode.UNAUTHORIZED,
        );
      }
      const payload = AuthMapper.userToUserPayload(user);
      const accessToken = this.jwtService.generateToken(payload);

      return {
        id_user: payload.id_user,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        access_token: accessToken,
        refresh_token: '',
        expire_at: Date.now() + 3600 * 1000,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(
    registerRequest: RegisterRequest,
  ): Promise<AuthResponse | null> {
    try {
      const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'password',
        'address',
        'phone',
        'identification',
      ];
      const missingFields = validateFields(registerRequest, requiredFields);

      if (missingFields.length > 0) {
        throw new BadRequestException(missingFields);
      }
      const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
      const user = AuthMapper.RegisterRequestToAuthModel({
        ...registerRequest,
        password: hashedPassword,
      });

      const userCreated = await this.userRepository.createUser(user);
      const payload = AuthMapper.userToUserPayload(userCreated);
      const accessToken = this.jwtService.generateToken(payload);

      return {
        id_user: payload.id_user,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        access_token: accessToken,
        refresh_token: '',
        expire_at: Date.now() + 3600 * 1000,
      };
    } catch (error) {
      throw error;
    }
  }
}
