import { Injectable } from '@nestjs/common';
import { InterfaceToken } from '../usecases/jwt.interface.token';
import { UserPayload } from '../payload/payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtUseCaseService implements InterfaceToken {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: UserPayload): string {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  verifyToken(token: string): UserPayload {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
