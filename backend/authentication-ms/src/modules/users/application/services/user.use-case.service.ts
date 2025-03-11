import { environments } from 'src/settings/environments/environments';
import { Inject, Injectable } from '@nestjs/common';
import { InterfaceUseCaseUserServices } from '../usecases/user.use-case.interface';
import { UserResponse } from '../../domain/schema/dto/response/user.response';
import { UserRequest } from '../../domain/schema/dto/request/user.request';
import { InterfaceUserRepository } from '../../domain/contracts/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserUseCaseService implements InterfaceUseCaseUserServices {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: InterfaceUserRepository,
  ) {}

  async findAllUsers(): Promise<UserResponse[]> {
    return await this.userRepository.findAllUsers();
  }
  async findUserByEmail(email: string): Promise<UserResponse | null> {
    return await this.userRepository.findUserByEmail(email);
  }
  async createUser(userRequest: UserRequest): Promise<UserResponse | null> {
    const hashingPassword: string = bcrypt.hashSync(
      userRequest.password,
      environments.saltRound,
    );
    userRequest.password = hashingPassword;
    return await this.userRepository.createUser(
      UserMapper.userRequestToUserModel(userRequest),
    );
  }
  async updateUser(
    email: string,
    userRequest: UserRequest,
  ): Promise<UserResponse | null> {
    const hashingPassword: string = bcrypt.hashSync(
      userRequest.password,
      environments.saltRound,
    );
    userRequest.password = hashingPassword;
    return await this.userRepository.updateUser(
      email,
      UserMapper.userRequestToUserModel(userRequest),
    );
  }
  async deleteUser(email: string): Promise<boolean> {
    return await this.userRepository.deleteUser(email);
  }
}
