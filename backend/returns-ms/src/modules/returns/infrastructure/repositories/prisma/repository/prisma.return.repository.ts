import { statusCode } from '../../../../../../settings/environments/status-code';
import { Injectable } from '@nestjs/common';
import { ReturnRepositoryInterface } from 'src/modules/returns/domain/contracts/return.repository.interface';
import { ReturnResponse } from 'src/modules/returns/domain/schemas/dto/response/return.response';
import { ReturnModel } from 'src/modules/returns/domain/schemas/model/return.model';
import { CustomHttpException } from 'src/shared/errors/exception/CustomHttpException';
import { ResourceNotFoundException } from 'src/shared/errors/exception/ResourceNotFoundException';
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
        throw new CustomHttpException(
          'The return already exists',
          statusCode.CONFLICT,
        );
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
        throw new CustomHttpException(
          'The return was not found',
          statusCode.NOT_FOUND,
        );
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
        throw new CustomHttpException(
          'The returns were not found',
          statusCode.NOT_FOUND,
        );
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
        throw new CustomHttpException(
          'The return was not found',
          statusCode.NOT_FOUND,
        );
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
        throw new CustomHttpException(
          'The return was not found',
          statusCode.NOT_FOUND,
        );
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
