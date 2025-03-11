import { ApiProperty } from '@nestjs/swagger';
export class ReturnRequest {
  @ApiProperty({
    type: String,
    description: 'Reason for return',
    required: true,
    example: 'The product is damaged',
  })
  reason: string;
  @ApiProperty({
    type: 'integer',
    description: 'Id of the selling',
    required: true,
    example: 1,
  })
  id_selling: number;
}
