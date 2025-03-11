import { UserResponse } from '../schema/dto/response/user.response';
import { UserModel } from '../schema/model/user.model';

export interface InterfaceUserRepository {
  findAllUsers(): Promise<UserResponse[]>;
  findUserByEmail(email: string): Promise<UserResponse | null>;
  createUser(userModel: UserModel): Promise<UserResponse | null>;
  updateUser(email: string, userModel: UserModel): Promise<UserResponse | null>;
  deleteUser(email: string): Promise<boolean>;
}
