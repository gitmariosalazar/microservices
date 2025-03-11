import { UserRequest } from '../../domain/schema/dto/request/user.request';
import { UserResponse } from '../../domain/schema/dto/response/user.response';

export interface InterfaceUseCaseUserServices {
  findAllUsers(): Promise<UserResponse[]>;
  findUserByEmail(email: string): Promise<UserResponse | null>;
  createUser(userRequest: UserRequest): Promise<UserResponse | null>;
  updateUser(
    email: string,
    userRequest: UserRequest,
  ): Promise<UserResponse | null>;
  deleteUser(email: string): Promise<boolean>;
}
