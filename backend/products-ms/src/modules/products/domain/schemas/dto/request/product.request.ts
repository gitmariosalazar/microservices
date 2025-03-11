import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @ApiProperty({
    example: 'PROD-001',
    description: 'Product code',
    required: true,
    uniqueItems: true,
  })
  code: string;
  @ApiProperty({
    example: 'Mouse Logitech',
    description: 'Product name',
    required: true,
    uniqueItems: true,
  })
  name: string;
  @ApiProperty({
    example: 'Mouse Logitech G203',
    description: 'Product description',
    required: true,
  })
  description: string;
  @ApiProperty({
    example: 10,
    description: 'Product quantity',
    required: true,
  })
  quantity: number;
  @ApiProperty({
    example: 15,
    description: 'Product iva',
    required: true,
  })
  iva: number;
  @ApiProperty({
    example: 'Logitech',
    description: 'Product mark',
    required: true,
  })
  mark: string;
  @ApiProperty({
    example: 10.25,
    description: 'Product supplier price',
    required: true,
  })
  supplier_price: number;
}
