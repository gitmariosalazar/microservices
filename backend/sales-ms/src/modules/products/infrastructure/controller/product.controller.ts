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
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all products ✅' })
  async getProducts(@Req() request: Request): Promise<ApiResponse> {
    const products = await this.productService.getProducts();
    return new ApiResponse('Products found', products, request.url);
  }

  @Get('find-by-code/:code')
  @ApiOperation({ summary: 'Method GET - Get product by code ✅' })
  async getProductByCode(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<ApiResponse> {
    const product = await this.productService.getProductByCode(code);
    return new ApiResponse('Product found', product, request.url);
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a product ✅' })
  async createProduct(
    @Req() request: Request,
    @Body() product: ProductRequest,
  ): Promise<ApiResponse> {
    const productCreated = await this.productService.createProduct(product);
    return new ApiResponse('Product created', productCreated, request.url);
  }

  @Put('update/:code')
  @ApiOperation({ summary: 'Method PUT - Update a product ✅' })
  async updateProduct(
    @Req() request: Request,
    @Param('code') code: string,
    @Body() product: ProductRequest,
  ): Promise<ApiResponse> {
    const productUpdated = await this.productService.updateProduct(
      product,
      code,
    );
    return new ApiResponse('Product updated', productUpdated, request.url);
  }

  @Delete('delete/:code')
  @ApiOperation({ summary: 'Method DELETE - Delete a product ✅' })
  async deleteProduct(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<ApiResponse> {
    const productDeleted = await this.productService.deleteProduct(code);
    return new ApiResponse('Product deleted', productDeleted, request.url);
  }

  @Get('unpurchased')
  @ApiOperation({ summary: 'Method GET - Get all unpurchased products ✅' })
  async findUnpurshasedProducts(@Req() request: Request): Promise<ApiResponse> {
    const products = await this.productService.findUnpurshasedProducts();
    return new ApiResponse('Products found', products, request.url);
  }

  @Get('purchased')
  @ApiOperation({ summary: 'Method GET - Get all purchased products ✅' })
  async findPurchasedProducts(@Req() request: Request): Promise<ApiResponse> {
    const products = await this.productService.findPurchasedProducts();
    return new ApiResponse('Products found', products, request.url);
  }

  @Get('warning-stock')
  @ApiOperation({
    summary: 'Method GET - Get all products with warning stock ✅',
  })
  async findWarningStockProducts(
    @Req() request: Request,
  ): Promise<ApiResponse> {
    const products = await this.productService.findWarningStockProducts();
    return new ApiResponse('Products found', products, request.url);
  }
}
