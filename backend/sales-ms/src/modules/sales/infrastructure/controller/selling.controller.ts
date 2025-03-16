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
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('selling')
@ApiTags('Selling')
export class SellingController {
  constructor(private readonly sellingUseCaseService: SellingUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Find all sales' })
  @MessagePattern({ cmd: 'find-all-selling' })
  async getAllSelling() {
    const selling = await this.sellingUseCaseService.getAllSelling();
    return selling;
  }

  @Get('find-by-id/:id_selling')
  @ApiOperation({ summary: 'Method GET - Find a sale by id' })
  @MessagePattern({ cmd: 'find-selling-by-id' })
  async getSellingById(
    @Payload('id_selling', ParseIntPipe) id_selling: number,
  ) {
    const selling = await this.sellingUseCaseService.getSellingById(id_selling);
    return selling;
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a sale' })
  @MessagePattern({ cmd: 'create-selling' })
  async createSelling(@Payload() selling: SellingRequest) {
    const sellingCreated =
      await this.sellingUseCaseService.createSelling(selling);
    return sellingCreated;
  }

  @Put('update/:id_selling')
  @ApiOperation({ summary: 'Method PUT - Update a sale' })
  @MessagePattern({ cmd: 'update-selling' })
  async updateSelling(
    @Payload() payload: { selling: SellingRequest; id_selling: number },
  ) {
    const { selling, id_selling } = payload;
    const sellingUpdated = await this.sellingUseCaseService.updateSelling(
      selling,
      id_selling,
    );
    return sellingUpdated;
  }

  @Delete('delete/:id_selling')
  @ApiOperation({ summary: 'Method DELETE - Delete a sale' })
  @MessagePattern({ cmd: 'delete-selling' })
  async deleteSelling(@Payload('id_selling', ParseIntPipe) id_selling: number) {
    const sellingDeleted =
      await this.sellingUseCaseService.deleteSelling(id_selling);
    return sellingDeleted;
  }

  @Get('find-greater-selling')
  @ApiOperation({
    summary: 'Method GET - Find the sale with the highest value',
  })
  @MessagePattern({ cmd: 'find-greater-selling' })
  async findGreaterSelling() {
    const selling = await this.sellingUseCaseService.findGreaterSelling();
    return selling;
  }

  @Get('find-less-selling')
  @ApiOperation({ summary: 'Method GET - Find the sale with the lowest value' })
  @MessagePattern({ cmd: 'find-less-selling' })
  async findLessSelling() {
    const selling = await this.sellingUseCaseService.findLessSelling();
    return selling;
  }

  @Get('find-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find a sale by date' })
  @MessagePattern({ cmd: 'find-selling-by-date' })
  async findSellingByDate(@Payload('date') date: Date) {
    const selling = await this.sellingUseCaseService.findSellingByDate(date);
    return selling;
  }

  @Get('find-amount-by-date/:date')
  @ApiOperation({ summary: 'Method GET - Find the amount of sales by date' })
  @MessagePattern({ cmd: 'find-amount-selling-by-date' })
  async findAmountSellingByDate(@Payload('date') date: Date) {
    console.log(date);
    const selling =
      await this.sellingUseCaseService.findAmountSellingByDate(date);
    return selling;
  }
}
