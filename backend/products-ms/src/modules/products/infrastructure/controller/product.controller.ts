import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductUseCaseService } from '../../application/services/product.use-case.service';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all products ✅' })
  @MessagePattern({ cmd: 'find-all-products' })
  async getProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get('find-by-code/:code')
  @ApiOperation({ summary: 'Method GET - Get product by code ✅' })
  @MessagePattern({ cmd: 'find-product-by-code' })
  async getProductByCode(@Payload('code') code: string) {
    const product = await this.productService.getProductByCode(code);
    return product;
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a product ✅' })
  @MessagePattern({ cmd: 'create-product' })
  async createProduct(@Payload() product: ProductRequest) {
    const productCreated = await this.productService.createProduct(product);
    return productCreated;
  }

  @Put('update/:code')
  @ApiOperation({ summary: 'Method PUT - Update a product ✅' })
  @MessagePattern({ cmd: 'update-product' })
  async updateProduct(
    @Payload() payload: { product: ProductRequest; code: string },
  ) {
    const { product, code } = payload;
    const productUpdated = await this.productService.updateProduct(
      product,
      code,
    );
    return productUpdated;
  }

  @Delete('delete/:code')
  @ApiOperation({ summary: 'Method DELETE - Delete a product ✅' })
  @MessagePattern({ cmd: 'delete-product' })
  async deleteProduct(@Payload('code') code: string) {
    const productDeleted = await this.productService.deleteProduct(code);
    return productDeleted;
  }

  @Get('unpurchased')
  @ApiOperation({ summary: 'Method GET - Get all unpurchased products ✅' })
  @MessagePattern({ cmd: 'find-unpurchased-products' })
  async findUnpurshasedProducts() {
    const products = await this.productService.findUnpurshasedProducts();
    return products;
  }

  @Get('purchased')
  @ApiOperation({ summary: 'Method GET - Get all purchased products ✅' })
  @MessagePattern({ cmd: 'find-purchased-products' })
  async findPurchasedProducts() {
    const products = await this.productService.findPurchasedProducts();
    return products;
  }

  @Get('warning-stock')
  @ApiOperation({
    summary: 'Method GET - Get all products with warning stock ✅',
  })
  @MessagePattern({ cmd: 'find-warning-stock-products' })
  async findWarningStockProducts() {
    const products = await this.productService.findWarningStockProducts();
    return products;
  }
}
