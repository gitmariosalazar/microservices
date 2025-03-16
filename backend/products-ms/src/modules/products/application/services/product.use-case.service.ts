import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProductUseCaseService } from '../usecases/product.use-case.interface';
import { ProductRepositoryInterface } from '../../domain/contracts/product.repository.interface';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { environments } from 'src/settings/environments/environments';
import { ProductModel } from '../../domain/schemas/model/product.model';
import { ProductMapper } from '../mappers/product.mapper';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { BadRequestException } from 'src/shared/errors/exception/BadRequestException';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';

@Injectable()
export class ProductUseCaseService implements InterfaceProductUseCaseService {
  private readonly percentage_increment: number = parseFloat(
    `${environments.percentageIncrement}`,
  );
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async createProduct(
    product: ProductRequest,
  ): Promise<ProductResponse | null> {
    try {
      const requiredFields: string[] = [
        'code',
        'description',
        'iva',
        'mark',
        'name',
        'quantity',
        'supplier_price',
      ];
      const missingFieldMessages: string[] = validateFields(
        product,
        requiredFields,
      );
      if (missingFieldMessages.length > 0) {
        throw new RpcException(
          {
            statusCode: statusCode.BAD_REQUEST,
            message: missingFieldMessages,
          }
        )
      }
      const publicPrice: number = this.calculatePublicPrice(
        this.percentage_increment,
        product.iva,
        product.supplier_price,
      );
      const productModel: ProductModel = ProductMapper.toModel(product);
      productModel.percentage_increment = this.percentage_increment;
      productModel.public_price = publicPrice;
      return await this.productRepository.createProduct(productModel);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    product: ProductRequest,
    code: string,
  ): Promise<ProductResponse | null> {
    try {
      const requiredFields: string[] = [
        'code',
        'description',
        'iva',
        'mark',
        'name',
        'quantity',
        'supplier_price',
      ];
      const missingFieldMessages: string[] = validateFields(
        product,
        requiredFields,
      );
      if (missingFieldMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldMessages,
        });
      }
      const publicPrice: number = this.calculatePublicPrice(
        this.percentage_increment,
        product.iva,
        product.supplier_price,
      );
      const productModel: ProductModel = ProductMapper.toModel(product);
      productModel.percentage_increment = this.percentage_increment;
      productModel.public_price = publicPrice;
      return await this.productRepository.updateProduct(productModel, code);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(code: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(code);
  }

  async getProductByCode(code: string): Promise<ProductResponse | null> {
    return await this.productRepository.getProductByCode(code);
  }

  async getProducts(): Promise<ProductResponse[]> {
    try {
      return await this.productRepository.getProducts();
    } catch (error) {
      throw error;
    }
  }
  private calculatePublicPrice(
    percentage: number,
    iva: number,
    price: number,
  ): number {
    const aux: number =
      price * ((100 + percentage) / 100) * ((100 + iva) / 100);
    return parseFloat(aux.toFixed(2));
  }

  async findUnpurshasedProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findUnpurshasedProducts();
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findPurchasedProducts();
  }

  async findWarningStockProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findWarningStockProducts();
  }
}
