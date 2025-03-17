import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceSellingRepository } from 'src/modules/sales/domain/contracts/selling.repository.interface';
import { SellingAmountResponse } from 'src/modules/sales/domain/schemas/dto/response/selling.amount.response';
import { SellingResponse } from 'src/modules/sales/domain/schemas/dto/response/selling.response';
import { SellingModel } from 'src/modules/sales/domain/schemas/model/selling.model';
import { statusCode } from 'src/settings/environments/status-code';
import { CustomHttpException } from 'src/shared/errors/exception/CustomHttpException';
import { ResourceNotFoundException } from 'src/shared/errors/exception/ResourceNotFoundException';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class SellingRepositoryPrismaImplementation
  implements InterfaceSellingRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findGreaterSelling(): Promise<SellingResponse | null> {
    try {
      const maxSelling = await this.prisma.selling.aggregate({
        _max: {
          total: true,
        },
      });
      if (!maxSelling) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No sales found',
        })
      }
      const maxTotal = maxSelling._max.total;
      const selling = await this.prisma.selling.findFirst({
        where: {
          total: maxTotal,
        },
        include: {
          SellingItem: true,
        },
      });
      return {
        id_selling: selling.id_selling,
        id_user: selling.id_user,
        iva: selling.iva,
        total: selling.total,
        selling_code: selling.selling_code,
        selling_date: selling.selling_date,
        status: selling.status,
        sub_total: selling.sub_total,
        selling_items: selling.SellingItem.map((item) => ({
          id_selling_item: item.id_selling_item,
          id_selling: item.id_selling,
          id_product: item.id_product,
          quantity: item.quantity,
          iva: item.iva,
          sub_total: item.sub_total,
          total_price: item.total_price,
          unit_price: item.unit_price,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  async findLessSelling(): Promise<SellingResponse | null> {
    try {
      const minSelling = await this.prisma.selling.aggregate({
        _min: {
          total: true,
        },
      });
      if (!minSelling) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No sales found',
        })
      }
      const minTotal = minSelling._min.total;
      const selling = await this.prisma.selling.findFirst({
        where: {
          total: minTotal,
        },
        include: {
          SellingItem: true,
        },
      });
      return {
        id_selling: selling.id_selling,
        id_user: selling.id_user,
        iva: selling.iva,
        total: selling.total,
        selling_code: selling.selling_code,
        selling_date: selling.selling_date,
        status: selling.status,
        sub_total: selling.sub_total,
        selling_items: selling.SellingItem.map((item) => ({
          id_selling_item: item.id_selling_item,
          id_selling: item.id_selling,
          id_product: item.id_product,
          quantity: item.quantity,
          iva: item.iva,
          sub_total: item.sub_total,
          total_price: item.total_price,
          unit_price: item.unit_price,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  async findSellingByDate(date: Date): Promise<SellingResponse[]> {
    try {
      const isoDate = new Date(date).toISOString();
      const sales = await this.prisma.selling.findMany({
        where: {
          selling_date: isoDate,
        },
        include: {
          SellingItem: true,
        },
      });
      if (!sales || sales.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No sales found',
        })
      }
      return sales.map((selling) => ({
        id_selling: selling.id_selling,
        id_user: selling.id_user,
        iva: selling.iva,
        total: selling.total,
        selling_code: selling.selling_code,
        selling_date: selling.selling_date,
        status: selling.status,
        sub_total: selling.sub_total,
        selling_items: selling.SellingItem.map((item) => ({
          id_selling_item: item.id_selling_item,
          id_selling: item.id_selling,
          id_product: item.id_product,
          quantity: item.quantity,
          iva: item.iva,
          sub_total: item.sub_total,
          total_price: item.total_price,
          unit_price: item.unit_price,
        })),
      }));
    } catch (error) {
      throw error;
    }
  }

  async findAmountSellingByDate(
    date: Date,
  ): Promise<SellingAmountResponse | null> {
    try {
      const isoDate = new Date(date).toISOString();
      const sales = await this.prisma.selling.findMany({
        where: {
          selling_date: isoDate,
        },
        include: {
          SellingItem: true,
        },
      });
      if (!sales || sales.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No sales found',
        })
      }
      const total = sales.reduce((acc, selling) => acc + selling.total, 0);
      const sub_total = sales.reduce(
        (acc, selling) => acc + selling.sub_total,
        0,
      );
      const iva = sales.reduce((acc, selling) => acc + selling.iva, 0);
      const quantity_selling = sales.length;
      return {
        total,
        sub_total,
        iva,
        quantity_selling,
        date_selling: date,
      };
    } catch (error) {
      throw error;
    }
  }

  async createSelling(selling: SellingModel): Promise<SellingResponse | null> {
    try {
      const sellingCreated = await this.prisma.selling.create({
        data: {
          id_user: selling.id_user,
          iva: selling.iva,
          total: selling.total,
          selling_code: selling.selling_code,
          selling_date: selling.selling_date,
          status: selling.status,
          sub_total: selling.sub_total,
          SellingItem: {
            createMany: {
              data: selling.selling_items.map((item) => ({
                id_product: item.id_product,
                quantity: item.quantity,
                iva: item.iva,
                sub_total: item.sub_total,
                total_price: item.total_price,
                unit_price: item.unit_price,
              })),
            },
          },
        },
        include: {
          SellingItem: true,
        },
      });
      if (!sellingCreated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: '`Error creating selling',
        })
      }

      return {
        id_selling: sellingCreated.id_selling,
        id_user: sellingCreated.id_user,
        iva: sellingCreated.iva,
        total: sellingCreated.total,
        selling_code: sellingCreated.selling_code,
        selling_date: sellingCreated.selling_date,
        status: sellingCreated.status,
        sub_total: sellingCreated.sub_total,
        selling_items: sellingCreated.SellingItem.map((item) => ({
          id_selling_item: item.id_selling_item,
          id_selling: item.id_selling,
          id_product: item.id_product,
          quantity: item.quantity,
          iva: item.iva,
          sub_total: item.sub_total,
          total_price: item.total_price,
          unit_price: item.unit_price,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  async updateSelling(
    selling: SellingModel,
    id_selling: number,
  ): Promise<SellingResponse | null> {
    try {
      const sellingFound = await this.prisma.selling.findUnique({
        where: {
          id_selling,
        },
      });
      if (!sellingFound) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Selling with id_selling ${id_selling} not found`,
        })
      }
      await this.prisma.selling.update({
        where: {
          id_selling,
        },
        data: {
          id_user: selling.id_user,
          iva: selling.iva,
          total: selling.total,
          selling_code: selling.selling_code,
          selling_date: selling.selling_date,
          status: selling.status,
          sub_total: selling.sub_total,
        },
      });
      return {
        id_selling,
        id_user: selling.id_user,
        iva: selling.iva,
        total: selling.total,
        selling_code: selling.selling_code,
        selling_date: selling.selling_date,
        status: selling.status,
        sub_total: selling.sub_total,
        selling_items: selling.selling_items,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteSelling(id_selling: number): Promise<boolean> {
    try {
      const sellingFound = await this.prisma.selling.findUnique({
        where: {
          id_selling,
        },
      });
      if (!sellingFound) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Selling with id_selling ${id_selling} not found`,
        })
      }
      await this.prisma.selling.delete({
        where: {
          id_selling,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getSellingById(id_selling: number): Promise<SellingResponse | null> {
    const selling = await this.prisma.selling.findFirst({
      where: {
        id_selling: id_selling,
      },
      include: {
        SellingItem: true,
      },
    });
    if (!selling) {
      throw new RpcException({
        statusCode: statusCode.NOT_FOUND,
        message: `Selling with id_selling ${id_selling} not found`,
      })
    }
    return {
      id_selling: selling.id_selling,
      id_user: selling.id_user,
      iva: selling.iva,
      total: selling.total,
      selling_code: selling.selling_code,
      selling_date: selling.selling_date,
      status: selling.status,
      sub_total: selling.sub_total,
      selling_items: selling.SellingItem.map((item) => ({
        id_selling_item: item.id_selling_item,
        id_selling: item.id_selling,
        id_product: item.id_product,
        quantity: item.quantity,
        iva: item.iva,
        sub_total: item.sub_total,
        total_price: item.total_price,
        unit_price: item.unit_price,
      })),
    };
  }

  async getAllSelling(): Promise<SellingResponse[]> {
    const sales = await this.prisma.selling.findMany({
      include: {
        SellingItem: true,
      },
    });
    if (!sales) {
      throw new RpcException({
        statusCode: statusCode.NOT_FOUND,
        message: 'No sales found',
      })
    }
    return sales.map((selling) => ({
      id_selling: selling.id_selling,
      id_user: selling.id_user,
      iva: selling.iva,
      sub_total: selling.sub_total,
      total: selling.total,
      selling_code: selling.selling_code,
      selling_date: selling.selling_date,
      status: selling.status,
      subtotal: selling.sub_total,
      selling_items: selling.SellingItem.map((item) => ({
        id_selling_item: item.id_selling_item,
        id_selling: item.id_selling,
        id_product: item.id_product,
        quantity: item.quantity,
        iva: item.iva,
        sub_total: item.sub_total,
        total_price: item.total_price,
        unit_price: item.unit_price,
      })),
    }));
  }
}
