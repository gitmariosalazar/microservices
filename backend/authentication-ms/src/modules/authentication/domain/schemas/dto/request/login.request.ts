import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'mariosalazar.ms.10@gmail.com',
    required: true,
  })
  public email: string;
  @ApiProperty({
    type: String,
    description: 'Password of the user',
    example: 'password-mario',
    required: true,
  })
  public password: string;
}
