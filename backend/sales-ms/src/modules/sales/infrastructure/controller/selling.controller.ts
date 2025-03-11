import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { SellingUseCaseService } from '../../application/services/selling.use-case.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { SellingRequest } from '../../domain/schemas/dto/request/selling.request';

@Controller('selling')
@ApiTags('Selling')
export class SellingController {
  constructor(private readonly sellingUseCaseService: SellingUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Find all sales' })
  async getAllSelling(@Req() request: Request): Promise<ApiResponse> {
    const selling = await this.sellingUseCaseService.getAllSelling();
    return new ApiResponse('Sales found', selling, request.url);
  }

  @Get('find-by-id/:id_selling')
  @ApiOperation({ summary: 'Method GET - Find a sale by id' })
  async getSellingById(
    @Req() request: Request,
    @Param('id_selling', ParseIntPipe) id_selling: number,
  ): Promise<ApiResponse> {
    const selling = await this.sellingUseCaseService.getSellingById(id_selling);
    return new ApiResponse('Sale found', selling, request.url);
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a sale' })
  async createSelling(
    @Req() request: Request,
    @Body() selling: SellingRequest,
  ): Promise<ApiResponse> {
    const sellingCreated =
      await this.sellingUseCaseService.createSelling(selling);
    return new ApiResponse('Sale created', sellingCreated, request.url);
  }

  @Put('update/:id_selling')
  @ApiOperation({ summary: 'Method PUT - Update a sale' })
  async updateSelling(
    @Req() request: Request,
    @Param('id_selling') id_selling: number,
    @Body() selling: SellingRequest,
  ): Promise<ApiResponse> {
    const sellingUpdated = await this.sellingUseCaseService.updateSelling(
      selling,
      id_selling,
    );
    return new ApiResponse('Sale updated', sellingUpdated, request.url);
  }

  @Delete('delete/:id_selling')
  @ApiOperation({ summary: 'Method DELETE - Delete a sale' })
  async deleteSelling(
    @Req() request: Request,
    @Param('id_selling', ParseIntPipe) id_selling: number,
  ): Promise<ApiResponse> {
    const sellingDeleted =
      await this.sellingUseCaseService.deleteSelling(id_selling);
    return new ApiResponse('Sale deleted', sellingDeleted, request.url);
  }

  @Get('find-greater-selling')
  @ApiOperation({
    summary: 'Method GET - Find the sale with the highest value',
  })
  async findGreaterSelling(@Req() request: Request): Promise<ApiResponse> {
    const selling = await this.sellingUseCaseService.findGreaterSelling();
    return new ApiResponse('Sale found', selling, request.url);
  }

  @Get('find-less-selling')
  @ApiOperation({ summary: 'Method GET - Find the sale with the lowest value' })
  async findLessSelling(@Req() request: Request): Promise<ApiResponse> {
    const selling = await this.sellingUseCaseService.findLessSelling();
    return new ApiResponse('Sale found', selling, request.url);
  }

  @Get('find-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find a sale by date' })
  async findSellingByDate(
    @Req() request: Request,
    @Param('date') date: Date,
  ): Promise<ApiResponse> {
    const selling = await this.sellingUseCaseService.findSellingByDate(date);
    return new ApiResponse('Sale found', selling, request.url);
  }

  @Get('find-amount-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find the amount of sales by date' })
  async findAmountSellingByDate(
    @Req() request: Request,
    @Param('date') date: Date,
  ): Promise<ApiResponse> {
    const selling =
      await this.sellingUseCaseService.findAmountSellingByDate(date);
    return new ApiResponse('Sale found', selling, request.url);
  }
}
