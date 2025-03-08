import { Injectable, Logger } from '@nestjs/common';
import { InterfaceUserRepository } from 'src/modules/users/domain/contracts/user.repository.interface';
import { UserResponse } from 'src/modules/users/domain/schema/dto/response/user.response';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { UserAdapter } from '../../../adapters/user.adapter';
import { ResourceNotFoundException } from 'src/shared/errors/exception/ResourceNotFoundException';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { BadRequestException } from 'src/shared/errors/exception/BadRequestException';
import { CustomHttpException } from 'src/shared/errors/exception/CustomHttpException';
import { statusCode } from 'src/settings/environments/status-code';
import { UserModel } from 'src/modules/users/domain/schema/model/user.model';

@Injectable()
export class UserRepositoryPrismaImplementation
  implements InterfaceUserRepository
{
  private readonly logger: Logger = new Logger(
    UserRepositoryPrismaImplementation.name,
  );
  constructor(private readonly prismaService: PrismaService) {}
  async findAllUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.prismaService.user.findMany();
      if (users.length > 0) {
        return users.map(UserAdapter.userModelToUserResponse);
      } else {
        throw new ResourceNotFoundException('users');
      }
    } catch (error) {
      throw error;
    }
  }
  async findUserByEmail(email: string): Promise<UserResponse | null> {
    try {
      const userFound = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });
      if (userFound) {
        return UserAdapter.userModelToUserResponse(userFound);
      } else {
        throw new ResourceNotFoundException('users', 'email', email);
      }
    } catch (error) {
      throw error;
    }
  }
  async createUser(userModel: UserModel): Promise<UserResponse | null> {
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
      const missingFieldMessages: string[] = validateFields(
        userModel,
        requiredFields,
      );
      if (missingFieldMessages.length > 0) {
        throw new BadRequestException(missingFieldMessages);
      }
      const userFound = await this.prismaService.user.findFirst({
        where: {
          OR: [
            { email: userModel.email },
            { identification: userModel.identification },
          ],
        },
      });
      if (userFound) {
        throw new CustomHttpException(
          'User with email or identification already exists',
          statusCode.CONFLICT,
        );
      }
      const userCreated = await this.prismaService.user.create({
        data: userModel,
      });
      return UserAdapter.userModelToUserResponse(userCreated);
    } catch (error) {
      throw error;
    }
  }
  async updateUser(
    email: string,
    userModel: UserModel,
  ): Promise<UserResponse | null> {
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
      const missingFieldMessages: string[] = validateFields(
        userModel,
        requiredFields,
      );
      if (missingFieldMessages.length > 0) {
        throw new BadRequestException(missingFieldMessages);
      }
      const userFound = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });
      if (userFound) {
        const userUpdated = await this.prismaService.user.update({
          where: {
            email: email,
          },
          data: userModel,
        });
        return UserAdapter.userModelToUserResponse(userUpdated);
      } else {
        throw new ResourceNotFoundException('users', 'email', email);
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(email: string): Promise<boolean> {
    try {
      const userFound = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });
      if (userFound) {
        const userDeleted = await this.prismaService.user.delete({
          where: {
            email: email,
          },
        });
        return true;
      } else {
        throw new ResourceNotFoundException('users', 'email', email);
      }
    } catch (error) {
      throw error;
    }
  }
}
