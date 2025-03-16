import { statusCode } from '../../../../../../settings/environments/status-code';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ReturnRepositoryInterface } from 'src/modules/returns/domain/contracts/return.repository.interface';
import { ReturnResponse } from 'src/modules/returns/domain/schemas/dto/response/return.response';
import { ReturnModel } from 'src/modules/returns/domain/schemas/model/return.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class ReturnRepositoryPrismaImplementation
  implements ReturnRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}
  async createReturn(returnModel: ReturnModel): Promise<ReturnResponse | null> {
    try {
      const returnFound = await this.prisma.returns.findFirst({
        where: {
          id_selling: returnModel.id_selling,
        },
      });
      if (returnFound) {
        throw new RpcException({
          statusCode: statusCode.CONFLICT,
          message: `Return with id_selling ${returnModel.id_selling} already exists`,
        });
      }
      const createdReturn = await this.prisma.returns.create({
        data: {
          reason: returnModel.reason,
          return_date: new Date(),
          status: 'return',
          id_selling: returnModel.id_selling,
        },
        include: {
          selling: {
            include: {
              SellingItem: true,
            },
          },
        },
      });

      return {
        ...createdReturn,
        selling: {
          ...createdReturn.selling,
          selling_items: createdReturn.selling.SellingItem.map((item) => ({
            ...item,
            sub_total: item.sub_total,
          })),
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async getReturnById(id_return: number): Promise<ReturnResponse | null> {
    try {
      const returnItem = await this.prisma.returns.findFirst({
        where: {
          id_return,
        },
        include: {
          selling: {
            include: {
              SellingItem: true,
            },
          },
        },
      });
      if (!returnItem) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Return with id_return ${id_return} not found`,
        });
      }
      return {
        ...returnItem,
        selling: {
          ...returnItem.selling,
          selling_items: returnItem.selling.SellingItem.map((item) => ({
            ...item,
            sub_total: item.sub_total,
          })),
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async getReturns(): Promise<ReturnResponse[]> {
    try {
      const returns = await this.prisma.returns.findMany({
        include: {
          selling: {
            include: {
              SellingItem: true,
            },
          },
        },
      });
      if (!returns) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Returns not found`,
        });
      }
      return returns.map((returnItem) => ({
        ...returnItem,
        selling: {
          ...returnItem.selling,
          selling_items: returnItem.selling.SellingItem.map((item) => ({
            ...item,
            sub_total: item.sub_total,
          })),
        },
      }));
    } catch (error) {
      throw error;
    }
  }
  async updateReturn(
    id_return: number,
    returnModel: ReturnModel,
  ): Promise<ReturnResponse | null> {
    try {
      const returnFound = await this.prisma.returns.findFirst({
        where: {
          id_return,
        },
      });
      if (!returnFound) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Return with id_return ${id_return} not found`,
        });
      }
      const updatedReturn = await this.prisma.returns.update({
        where: { id_return },
        data: { ...returnModel },
        include: { selling: { include: { SellingItem: true } } },
      });
      return {
        ...updatedReturn,
        selling: {
          ...updatedReturn.selling,
          selling_items: updatedReturn.selling.SellingItem.map((item) => ({
            ...item,
            sub_total: item.sub_total,
          })),
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteReturn(id_return: number): Promise<boolean> {
    try {
      const returnFound = await this.prisma.returns.findFirst({
        where: {
          id_return,
        },
      });
      if (!returnFound) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Return with id_return ${id_return} not found`,
        });
      }
      await this.prisma.returns.delete({
        where: {
          id_return,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
