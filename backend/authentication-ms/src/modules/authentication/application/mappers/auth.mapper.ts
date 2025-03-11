import { RegisterRequest } from './../../domain/schemas/dto/request/register.request';
import { AuthModel } from '../../domain/schemas/model/auth.model';
import { date } from 'joi';
import { UserPayload } from '../payload/payload.interface';

export class AuthMapper {
  public static RegisterRequestToAuthModel(
    registerRequest: RegisterRequest,
  ): AuthModel {
    return {
      first_name: registerRequest.first_name,
      last_name: registerRequest.last_name,
      email: registerRequest.email,
      password: registerRequest.password,
      address: registerRequest.address,
      phone: registerRequest.phone,
      identification: registerRequest.identification,
    };
  }
  public static userToUserPayload(user: any): UserPayload {
    return {
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      identification: user.identification,
      date: new Date(),
    };
  }
}
