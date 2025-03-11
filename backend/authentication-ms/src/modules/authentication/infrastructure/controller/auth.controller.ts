import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUseCaseService } from '../../application/services/auth.use-case.service';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { LoginRequest } from '../../domain/schemas/dto/request/login.request';
import { RegisterRequest } from '../../domain/schemas/dto/request/register.request';
import { JwtUseCaseService } from '../../application/services/jwt.use-case.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthUseCaseService,
    private readonly jwtService: JwtUseCaseService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Method POST - Login ✅' })
  async login(
    @Req() request: Request,
    @Body() loginRequest: LoginRequest,
  ): Promise<ApiResponse> {
    const user = await this.authService.login(loginRequest);
    return new ApiResponse('User logged in successfully', user, request.url);
  }

  @Post('register')
  @ApiOperation({ summary: 'Method POST - Register ✅' })
  async register(
    @Req() request: Request,
    @Body() registerRequest: RegisterRequest,
  ): Promise<ApiResponse> {
    const user = await this.authService.register(registerRequest);
    return new ApiResponse('User registered successfully', user, request.url);
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Method GET - Verify token ✅' })
  async verifyToken(@Req() request: Request): Promise<ApiResponse> {
    const token = request['token'];
    console.log(token);
    const user = this.jwtService.verifyToken(token);
    return new ApiResponse('Token verified successfully', user, request.url);
  }
}
