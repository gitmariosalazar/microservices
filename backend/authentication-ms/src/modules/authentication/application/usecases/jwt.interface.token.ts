import { UserPayload } from '../payload/payload.interface';

export interface InterfaceToken {
  generateToken(payload: UserPayload): string;
  verifyToken(token: string): UserPayload;
}
