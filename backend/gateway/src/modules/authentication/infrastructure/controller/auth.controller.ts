import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { LoginRequest } from '../../domain/schemas/dto/request/login.request';
import { RegisterRequest } from '../../domain/schemas/dto/request/register.request';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(environments.authService) private readonly userClient: ClientProxy,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Method POST - Login ✅' })
  async login(
    @Req() request: Request,
    @Body() loginRequest: LoginRequest,
  ): Promise<ApiResponse> {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'login' }, loginRequest),
      );
      return new ApiResponse('User logged in successfully', user, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Method POST - Register ✅' })
  async register(
    @Req() request: Request,
    @Body() registerRequest: RegisterRequest,
  ): Promise<ApiResponse> {
    try {
      const userRegistered = await firstValueFrom(
        this.userClient.send({ cmd: 'register' }, registerRequest),
      );
      return new ApiResponse(
        'User registered successfully',
        userRegistered,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error.error);
    }
  }

  @Get('verify')
  @ApiOperation({ summary: 'Method GET - Verify token ✅' })
  async verifyToken(@Req() request: Request): Promise<ApiResponse> {
    try {
      const token = request['token'];
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'verify-token' }, {}),
      );
      return new ApiResponse('Token verified successfully', user, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
