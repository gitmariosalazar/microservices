import { ApiProperty } from '@nestjs/swagger';
import { SellingItemsRequest } from './selling-items.resquest';

export class SellingRequest {
  @ApiProperty({
    example: 1,
    description: 'Id of the user',
    required: true,
  })
  id_user: number;
  @ApiProperty({
    example: [
      {
        id_product: 1,
        quantity: 4,
      },
      {
        id_product: 2,
        quantity: 2,
      },
    ],

    description: 'Items of the selling',
    required: true,
  })
  selling_items: SellingItemsRequest[];
}
