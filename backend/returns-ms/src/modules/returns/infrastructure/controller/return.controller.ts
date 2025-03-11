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

@Controller('returns')
@ApiTags('Returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnUseCaseService) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all returns ✅' })
  async getReturns(@Req() request: Request): Promise<ApiResponse> {
    const products = await this.returnService.getReturns();
    return new ApiResponse('Returns found', products, request.url);
  }

  @Get('find-one/:id_return')
  @ApiOperation({ summary: 'Method GET - Get return by id ✅' })
  async getReturnById(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
  ): Promise<ApiResponse> {
    const product = await this.returnService.getReturnById(id_return);
    return new ApiResponse('Return found', product, request.url);
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a new return ✅' })
  async createReturn(
    @Req() request: Request,
    @Body() returnRequest: ReturnRequest,
  ): Promise<ApiResponse> {
    const product = await this.returnService.createReturn(returnRequest);
    return new ApiResponse('Return created', product, request.url);
  }

  @Put('update/:id_return')
  @ApiOperation({ summary: 'Method PUT - Update a return ✅' })
  async updateReturn(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
    @Body() returnRequest: ReturnRequest,
  ): Promise<ApiResponse> {
    const product = await this.returnService.updateReturn(
      id_return,
      returnRequest,
    );
    return new ApiResponse('Return updated', product, request.url);
  }

  @Delete('delete/:id_return')
  @ApiOperation({ summary: 'Method DELETE - Delete a return ✅' })
  async deleteReturn(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
  ): Promise<ApiResponse> {
    const product = await this.returnService.deleteReturn(id_return);
    return new ApiResponse('Return deleted', product, request.url);
  }
}
