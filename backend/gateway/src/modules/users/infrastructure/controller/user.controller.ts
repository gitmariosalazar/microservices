import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { UserRequest } from '../../domain/schema/dto/request/user.request';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(environments.authService) private readonly userClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Method GET - Find all users ✅' })
  async findAllUsers(@Req() request: Request): Promise<ApiResponse> {
    try {
      const users = await firstValueFrom(
        this.userClient.send({ cmd: 'find-all-users' }, {}),
      );
      return new ApiResponse('Users found successfully', users, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':email')
  @ApiOperation({ summary: 'Method GET - Find user by email ✅' })
  @MessagePattern({ cmd: 'find-user-by-email' })
  async findUserByEmail(
    @Req() request: Request,
    @Param('email') email: string,
  ): Promise<ApiResponse> {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'find-user-by-email' }, { email: email }),
      );
      return new ApiResponse('User found successfully', user, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Method POST - Create user ✅' })
  @MessagePattern('create-user')
  async createUser(
    @Req() request: Request,
    @Body() userRequest: UserRequest,
  ): Promise<ApiResponse> {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'create-user' }, userRequest),
      );
      return new ApiResponse('User created successfully', user, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put(':email')
  @ApiOperation({ summary: 'Method PUT - Update user ✅' })
  @MessagePattern('update-user')
  async updateUser(
    @Req() request: Request,
    @Param('email') email: string,
    @Body() userRequest: UserRequest,
  ): Promise<ApiResponse> {
    try {
      const user = await firstValueFrom(
        this.userClient.send(
          { cmd: 'update-user' },
          { email: email, userRequest: userRequest },
        ),
      );
      return new ApiResponse('User updated successfully', user, request.url);
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Method DELETE - Delete user ✅' })
  @MessagePattern('delete-user')
  async deleteUser(
    @Req() request: Request,
    @Param('email') email: string,
  ): Promise<ApiResponse> {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'delete-user' }, { email: email }),
      );
      return new ApiResponse('User deleted successfully', user, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
