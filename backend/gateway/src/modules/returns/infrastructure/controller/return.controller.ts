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
import { ReturnRequest } from '../../domain/schemas/dto/request/return.request';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';

@Controller('returns')
@ApiTags('Returns')
export class ReturnController {
  constructor(
    @Inject(environments.returnsService)
    private readonly returnService: ClientProxy,
  ) {}

  @Get('find-all')
  @ApiOperation({ summary: 'Method GET - Get all returns ✅' })
  async getReturns(@Req() request: Request): Promise<ApiResponse> {
    try {
      const returns = await firstValueFrom(
        this.returnService.send({ cmd: 'find-all-returns' }, {}),
      );
      return new ApiResponse(
        'Returns found successfully',
        returns,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('find-one/:id_return')
  @ApiOperation({ summary: 'Method GET - Get return by id ✅' })
  @MessagePattern({ cmd: 'find-return-by-id' })
  async getReturnById(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
  ): Promise<ApiResponse> {
    try {
      const returns = await firstValueFrom(
        this.returnService.send({ cmd: 'find-return-by-id' }, { id_return }),
      );
      return new ApiResponse('Return found successfully', returns, request.url);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Method POST - Create a new return ✅' })
  async createReturn(
    @Req() request: Request,
    @Body() returnRequest: ReturnRequest,
  ): Promise<ApiResponse> {
    try {
      const returns = await firstValueFrom(
        this.returnService.send({ cmd: 'create-return' }, returnRequest),
      );
      return new ApiResponse(
        'Return created successfully',
        returns,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put('update/:id_return')
  @ApiOperation({ summary: 'Method PUT - Update a return ✅' })
  async updateReturn(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
    @Body() returnRequest: ReturnRequest,
  ): Promise<ApiResponse> {
    try {
      const returns = await firstValueFrom(
        this.returnService.send(
          { cmd: 'update-return' },
          { id_return: id_return, returnRequest: returnRequest },
        ),
      );
      return new ApiResponse(
        'Return updated successfully',
        returns,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:id_return')
  @ApiOperation({ summary: 'Method DELETE - Delete a return ✅' })
  async deleteReturn(
    @Req() request: Request,
    @Param('id_return', ParseIntPipe) id_return: number,
  ): Promise<ApiResponse> {
    try {
      const returns = await firstValueFrom(
        this.returnService.send(
          { cmd: 'delete-return' },
          { id_return: id_return },
        ),
      );
      return new ApiResponse(
        'Return deleted successfully',
        returns,
        request.url,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
