import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUseCaseService } from '../../application/services/user.use-case.service';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { UserRequest } from '../../domain/schema/dto/request/user.request';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserUseCaseService) {}

  @Get()
  @ApiOperation({ summary: 'Method GET - Find all users ✅' })
  async findAllUsers(@Req() request: Request): Promise<ApiResponse> {
    const users = await this.userService.findAllUsers();
    return new ApiResponse('Users found successfully', users, request.url);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Method GET - Find user by email ✅' })
  async findUserByEmail(
    @Req() request: Request,
    @Param('email') email: string,
  ): Promise<ApiResponse> {
    const user = await this.userService.findUserByEmail(email);
    return new ApiResponse('User found successfully', user, request.url);
  }

  @Post()
  @ApiOperation({ summary: 'Method POST - Create user ✅' })
  async createUser(
    @Req() request: Request,
    @Body() userRequest: UserRequest,
  ): Promise<ApiResponse> {
    const user = await this.userService.createUser(userRequest);
    return new ApiResponse('User created successfully', user, request.url);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Method PUT - Update user ✅' })
  async updateUser(
    @Req() request: Request,
    @Param('email') email: string,
    @Body() userRequest: UserRequest,
  ): Promise<ApiResponse> {
    const user = await this.userService.updateUser(email, userRequest);
    return new ApiResponse('User updated successfully', user, request.url);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Method DELETE - Delete user ✅' })
  async deleteUser(
    @Req() request: Request,
    @Param('email') email: string,
  ): Promise<ApiResponse> {
    const user = await this.userService.deleteUser(email);
    return new ApiResponse('User deleted successfully', user, request.url);
  }
}
