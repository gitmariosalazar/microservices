import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    type: String,
    description: 'First name of the user',
    example: 'Mario',
    required: true,
  })
  public first_name: string;
  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    example: 'Salazar',
    required: true,
  })
  public last_name: string;
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'mariosalazar.ms.10@gmail.com',
    uniqueItems: true,
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
  @ApiProperty({
    type: String,
    description: 'Address of the user',
    example: 'Avenue Sta. Rosa 19-42',
    required: true,
  })
  public address: string;
  @ApiProperty({
    type: String,
    description: 'Phone of the user',
    example: '0994532438',
    required: true,
  })
  public phone: string;
  @ApiProperty({
    type: String,
    description: 'Identification of the user',
    example: '1003938477',
    uniqueItems: true,
    required: true,
  })
  public identification: string;
}
