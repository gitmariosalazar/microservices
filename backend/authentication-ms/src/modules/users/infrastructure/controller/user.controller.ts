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
import { UserRequest } from '../../domain/schema/dto/request/user.request';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserUseCaseService) {}

  @Get()
  @ApiOperation({ summary: 'Method GET - Find all users ✅' })
  @MessagePattern({ cmd: 'find-all-users' })
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Get(':email')
  @ApiOperation({ summary: 'Method GET - Find user by email ✅' })
  @MessagePattern({ cmd: 'find-user-by-email' })
  async findUserByEmail(@Payload('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Method POST - Create user ✅' })
  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Body() userRequest: UserRequest) {
    const user = await this.userService.createUser(userRequest);
    return user;
  }

  @Put(':email')
  @ApiOperation({ summary: 'Method PUT - Update user ✅' })
  @MessagePattern({ cmd: 'update-user' })
  async updateUser(
    @Payload() payload: { email: string; userRequest: UserRequest },
  ) {
    const { email, userRequest } = payload;
    const user = await this.userService.updateUser(email, userRequest);
    return user;
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Method DELETE - Delete user ✅' })
  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload('email') email: string) {
    const user = await this.userService.deleteUser(email);
    return user;
  }
}
