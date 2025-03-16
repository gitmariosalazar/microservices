import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import {
  ClientProxy,
  RpcException,
} from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    @Inject(environments.productsService)
    private readonly productClient: ClientProxy,
  ) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all products ✅' })
  async getProducts(@Req() request: Request): Promise<ApiResponse> {
    try {
      const products = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all-products' }, {}),
      );
      return new ApiResponse(
        'Products found successfully',
        products,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-by-code/:code')
  @ApiOperation({ summary: 'Method GET - Get product by code ✅' })
  async getProductByCode(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<ApiResponse> {
    try {
      const product = await firstValueFrom(
        this.productClient.send(
          { cmd: 'find-product-by-code' },
          { code: code },
        ),
      );
      return new ApiResponse(
        'Product found successfully',
        product,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a product ✅' })
  async createProduct(
    @Req() request: Request,
    @Body() product: ProductRequest,
  ): Promise<ApiResponse> {
    try {
      const productCreated = await firstValueFrom(
        this.productClient.send({ cmd: 'create-product' }, product),
      );
      return new ApiResponse(
        'Product created successfully',
        productCreated,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put('update/:code')
  @ApiOperation({ summary: 'Method PUT - Update a product ✅' })
  async updateProduct(
    @Req() request: Request,
    @Param('code') code: string,
    @Body() product: ProductRequest,
  ): Promise<ApiResponse> {
    try {
      const productUpdated = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-product' },
          { product: product, code: code },
        ),
      );
      return new ApiResponse(
        'Product updated successfully',
        productUpdated,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:code')
  @ApiOperation({ summary: 'Method DELETE - Delete a product ✅' })
  async deleteProduct(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<ApiResponse> {
    try {
      const productDeleted = await firstValueFrom(
        this.productClient.send({ cmd: 'delete-product' }, { code: code }),
      );
      return new ApiResponse(
        'Product deleted successfully',
        productDeleted,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('unpurchased')
  @ApiOperation({ summary: 'Method GET - Get all unpurchased products ✅' })
  async findUnpurshasedProducts(@Req() request: Request): Promise<ApiResponse> {
    try {
      const products = await firstValueFrom(
        this.productClient.send({ cmd: 'find-unpurchased-products' }, {}),
      );
      return new ApiResponse(
        'Unpurchased products found successfully',
        products,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('purchased')
  @ApiOperation({ summary: 'Method GET - Get all purchased products ✅' })
  async findPurchasedProducts(@Req() request: Request): Promise<ApiResponse> {
    try {
      const products = await firstValueFrom(
        this.productClient.send({ cmd: 'find-purchased-products' }, {}),
      );
      return new ApiResponse(
        'Purchased products found successfully',
        products,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('warning-stock')
  @ApiOperation({
    summary: 'Method GET - Get all products with warning stock ✅',
  })
  async findWarningStockProducts(
    @Req() request: Request,
  ): Promise<ApiResponse> {
    try {
      const products = await firstValueFrom(
        this.productClient.send({ cmd: 'find-warning-stock-products' }, {}),
      );
      return new ApiResponse(
        'Products with warning stock found successfully',
        products,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
