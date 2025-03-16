import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { SellingRequest } from '../../domain/schemas/dto/request/selling.request';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';

@Controller('selling')
@ApiTags('Selling')
export class SellingController {
  constructor(
    @Inject(environments.salesService)
    private readonly sellingClient: ClientProxy,
  ) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Find all sales ✅' })
  async getAllSelling(@Req() request: Request): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send({ cmd: 'find-all-selling' }, {}),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-by-id/:id_selling')
  @ApiOperation({ summary: 'Method GET - Find a sale by id ✅' })
  async getSellingById(
    @Req() request: Request,
    @Param('id_selling', ParseIntPipe) id_selling: number,
  ): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send(
          { cmd: 'find-selling-by-id' },
          { id_selling: id_selling },
        ),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a sale ✅' })
  async createSelling(
    @Req() request: Request,
    @Body() selling: SellingRequest,
  ): Promise<ApiResponse> {
    try {
      const sellingCreated = await firstValueFrom(
        this.sellingClient.send({ cmd: 'create-selling' }, selling),
      );
      return new ApiResponse(
        'Selling created successfully',
        sellingCreated,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put('update/:id_selling')
  @ApiOperation({ summary: 'Method PUT - Update a sale ✅' })
  async updateSelling(
    @Req() request: Request,
    @Param('id_selling', ParseIntPipe) id_selling: number,
    @Body() selling: SellingRequest,
  ): Promise<ApiResponse> {
    try {
      const sellingUpdated = await firstValueFrom(
        this.sellingClient.send(
          { cmd: 'update-selling' },
          { id_selling, selling },
        ),
      );
      return new ApiResponse(
        'Selling updated successfully',
        sellingUpdated,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:id_selling')
  @ApiOperation({ summary: 'Method DELETE - Delete a sale ✅' })
  async deleteSelling(
    @Req() request: Request,
    @Param('id_selling', ParseIntPipe) id_selling: number,
  ): Promise<ApiResponse> {
    try {
      const sellingDeleted = await firstValueFrom(
        this.sellingClient.send(
          { cmd: 'delete-selling' },
          { id_selling: id_selling },
        ),
      );
      return new ApiResponse(
        'Selling deleted successfully',
        sellingDeleted,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-greater-selling')
  @ApiOperation({
    summary: 'Method GET - Find the sale with the highest value ✅',
  })
  async findGreaterSelling(@Req() request: Request): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send({ cmd: 'find-greater-selling' }, {}),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-less-selling')
  @ApiOperation({
    summary: 'Method GET - Find the sale with the lowest value ✅',
  })
  async findLessSelling(@Req() request: Request): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send({ cmd: 'find-less-selling' }, {}),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find a sale by date ✅' })
  async findSellingByDate(
    @Req() request: Request,
    @Param('date') date: Date,
  ): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send(
          { cmd: 'find-selling-by-date' },
          { date: date },
        ),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-amount-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find the amount of sales by date ✅' })
  async findAmountSellingByDate(
    @Req() request: Request,
    @Param('date') date: Date,
  ): Promise<ApiResponse> {
    try {
      const selling = await firstValueFrom(
        this.sellingClient.send(
          { cmd: 'find-amount-selling-by-date' },
          { date: date },
        ),
      );
      return new ApiResponse(
        'Selling found successfully',
        selling,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
