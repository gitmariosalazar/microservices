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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnUseCaseService } from '../../application/services/return.use-case.service';
import { ApiResponse } from 'src/shared/errors/responses/ApiResponse';
import { ReturnRequest } from '../../domain/schemas/dto/request/return.request';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('returns')
@ApiTags('Returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all returns ✅' })
  @MessagePattern({ cmd: 'find-all-returns' })
  async getReturns() {
    const products = await this.returnService.getReturns();
    return products;
  }

  @Get('find-one/:id_return')
  @ApiOperation({ summary: 'Method GET - Get return by id ✅' })
  @MessagePattern({ cmd: 'find-return-by-id' })
  async getReturnById(@Payload('id_return', ParseIntPipe) id_return: number) {
    const product = await this.returnService.getReturnById(id_return);
    return product;
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a new return ✅' })
  @MessagePattern({ cmd: 'create-return' })
  async createReturn(@Payload() returnRequest: ReturnRequest) {
    const product = await this.returnService.createReturn(returnRequest);
    return product;
  }

  @Put('update/:id_return')
  @ApiOperation({ summary: 'Method PUT - Update a return ✅' })
  @MessagePattern({ cmd: 'update-return' })
  async updateReturn(
    @Payload() payload: { id_return: number; returnRequest: ReturnRequest },
  ) {
    const { id_return, returnRequest } = payload;
    const product = await this.returnService.updateReturn(
      id_return,
      returnRequest,
    );
    return product;
  }

  @Delete('delete/:id_return')
  @ApiOperation({ summary: 'Method DELETE - Delete a return ✅' })
  @MessagePattern({ cmd: 'delete-return' })
  async deleteReturn(@Payload('id_return', ParseIntPipe) id_return: number) {
    const product = await this.returnService.deleteReturn(id_return);
    return product;
  }
}
