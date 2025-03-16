import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUseCaseService } from '../../application/services/auth.use-case.service';
import { LoginRequest } from '../../domain/schemas/dto/request/login.request';
import { RegisterRequest } from '../../domain/schemas/dto/request/register.request';
import { JwtUseCaseService } from '../../application/services/jwt.use-case.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthUseCaseService,
    private readonly jwtService: JwtUseCaseService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Method POST - Login ✅' })
  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginRequest: LoginRequest) {
    const user = await this.authService.login(loginRequest);
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Method POST - Register ✅' })
  @MessagePattern({ cmd: 'register' })
  async register(@Payload() registerRequest: RegisterRequest) {
    const user = await this.authService.register(registerRequest);
    return user;
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Method GET - Verify token ✅' })
  @MessagePattern({ cmd: 'verify-token' })
  async verifyToken(@Req() request: Request) {
    const token = request['token'];
    console.log(token);
    const user = this.jwtService.verifyToken(token);
    return user;
  }
}
