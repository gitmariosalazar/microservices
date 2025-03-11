import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from 'src/modules/products/domain/contracts/product.repository.interface';
import { ProductResponse } from 'src/modules/products/domain/schemas/dto/response/product.response';
import { ProductModel } from 'src/modules/products/domain/schemas/model/product.model';
import { statusCode } from 'src/settings/environments/status-code';
import { CustomHttpException } from 'src/shared/errors/exception/CustomHttpException';
import { ResourceNotFoundException } from 'src/shared/errors/exception/ResourceNotFoundException';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class ProductRepositoryPrismaImplementation
  implements ProductRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(product: ProductModel): Promise<ProductResponse | null> {
    try {
      const productFound = await this.prisma.product.findFirst({
        where: { OR: [{ code: product.code }, { name: product.name }] },
      });
      if (productFound) {
        throw new CustomHttpException(
          'Product already exists',
          statusCode.CONFLICT,
        );
      }
      const productCreated = await this.prisma.product.create({
        data: {
          code: product.code,
          description: product.description,
          iva: product.iva,
          mark: product.mark,
          name: product.name,
          percentage_increment: product.percentage_increment,
          public_price: product.public_price,
          quantity: product.quantity,
          supplier_price: product.supplier_price,
        },
      });
      return productCreated;
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(
    product: ProductModel,
    code: string,
  ): Promise<ProductResponse | null> {
    try {
      const productFound = await this.prisma.product.findFirst({
        where: { code: code },
      });
      if (!productFound) {
        throw new ResourceNotFoundException('products', 'code', code);
      }
      const productUpdated = await this.prisma.product.update({
        where: { code: code },
        data: {
          code: product.code,
          description: product.description,
          iva: product.iva,
          mark: product.mark,
          name: product.name,
          percentage_increment: product.percentage_increment,
          public_price: product.public_price,
          quantity: product.quantity,
          supplier_price: product.supplier_price,
        },
      });
      return productUpdated;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(code: string): Promise<boolean> {
    try {
      const productFound = await this.prisma.product.findFirst({
        where: { code: code },
      });
      if (!productFound) {
        throw new ResourceNotFoundException('products', 'code', code);
      }
      await this.prisma.product.delete({ where: { code: code } });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getProductByCode(code: string): Promise<ProductResponse | null> {
    try {
      const productFound = await this.prisma.product.findFirst({
        where: { code: code },
      });
      if (!productFound) {
        throw new ResourceNotFoundException('products', 'code', code);
      }
      return productFound;
    } catch (error) {
      throw error;
    }
  }
  async getProducts(): Promise<ProductResponse[]> {
    try {
      const products = await this.prisma.product.findMany();
      if (products.length === 0) {
        throw new ResourceNotFoundException('products');
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findUnpurshasedProducts(): Promise<ProductResponse[]> {
    try {
      const products = await this.prisma.product.findMany({
        where: { SellingItem: { none: {} } },
      });
      if (products.length === 0) {
        throw new ResourceNotFoundException('products');
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    try {
      const products = await this.prisma.product.findMany({
        where: { SellingItem: { some: {} } },
      });
      if (products.length === 0) {
        throw new ResourceNotFoundException('products');
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findWarningStockProducts(): Promise<ProductResponse[]> {
    try {
      const products = await this.prisma.product.findMany({
        where: { quantity: { lte: 5 } },
      });
      if (products.length === 0) {
        throw new ResourceNotFoundException('products');
      }
      return products;
    } catch (error) {
      throw error;
    }
  }
}
