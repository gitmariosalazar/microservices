import { ApiProperty } from '@nestjs/swagger';

export class SellingItemsRequest {
  @ApiProperty({
    example: 1,
    description: 'Id of the selling item',
    required: false,
  })
  id_selling: number;
  @ApiProperty({
    example: 1,
    description: 'Id of the product',
    required: true,
  })
  id_product: number;
  @ApiProperty({
    example: 1,
    description: 'Quantity of the product',
    required: true,
  })
  quantity: number;
}
