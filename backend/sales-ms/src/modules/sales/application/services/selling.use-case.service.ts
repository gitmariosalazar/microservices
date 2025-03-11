import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { InterfaceSellingUseCaseService } from '../usecases/selling.use-case.interface';
import { SellingRequest } from '../../domain/schemas/dto/request/selling.request';
import { SellingResponse } from '../../domain/schemas/dto/response/selling.response';
import { InterfaceSellingRepository } from '../../domain/contracts/selling.repository.interface';
import { SellingMapper } from '../mappers/selling.mapper';
import { ProductUseCaseService } from 'src/modules/products/application/services/product.use-case.service';
import { SellingModel } from '../../domain/schemas/model/selling.model';
import { SellingAmountResponse } from '../../domain/schemas/dto/response/selling.amount.response';

@Injectable()
export class SellingUseCaseService implements InterfaceSellingUseCaseService {
  constructor(
    @Inject('SellingRepository')
    private readonly sellingRepository: InterfaceSellingRepository,
    private readonly productService: ProductUseCaseService,
  ) {}

  async findGreaterSelling(): Promise<SellingResponse | null> {
    try {
      return await this.sellingRepository.findGreaterSelling();
    } catch (error) {
      throw error;
    }
  }

  async findLessSelling(): Promise<SellingResponse | null> {
    try {
      return await this.sellingRepository.findLessSelling();
    } catch (error) {
      throw error;
    }
  }

  async findSellingByDate(date: Date): Promise<SellingResponse[]> {
    try {
      return await this.sellingRepository.findSellingByDate(date);
    } catch (error) {
      throw error;
    }
  }

  async findAmountSellingByDate(
    date: Date,
  ): Promise<SellingAmountResponse | null> {
    try {
      return await this.sellingRepository.findAmountSellingByDate(date);
    } catch (error) {
      throw error;
    }
  }

  private async calculateTotal(selling: SellingRequest): Promise<SellingModel> {
    const sellingModel = SellingMapper.toModel(selling);
    sellingModel.total = 0;
    sellingModel.sub_total = 0;
    sellingModel.iva = 0;
    for (const item of sellingModel.selling_items) {
      const product = await this.productService.getProductById(item.id_product);
      item.iva =
        product.public_price * item.quantity -
        (product.public_price * item.quantity) / (100 + product.iva) / 100;
      item.sub_total =
        (product.public_price * item.quantity) / (100 + product.iva) / 100;
      item.total_price = product.public_price * item.quantity;
      item.unit_price = product.public_price;

      sellingModel.sub_total += item.sub_total;
      sellingModel.iva += item.iva;
      sellingModel.total = item.total_price;
    }
    sellingModel.selling_code = uuidv4();
    sellingModel.selling_date = new Date();
    sellingModel.status = 'delivered';
    return sellingModel;
  }

  async createSelling(
    selling: SellingRequest,
  ): Promise<SellingResponse | null> {
    try {
      const sellingModel = await this.calculateTotal(selling);
      return await this.sellingRepository.createSelling(sellingModel);
    } catch (error) {
      throw error;
    }
  }
  async updateSelling(
    selling: SellingRequest,
    id_selling: number,
  ): Promise<SellingResponse | null> {
    try {
      const sellingModel = await this.calculateTotal(selling);
      return await this.sellingRepository.updateSelling(
        sellingModel,
        id_selling,
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteSelling(id_selling: number): Promise<boolean> {
    try {
      return await this.sellingRepository.deleteSelling(id_selling);
    } catch (error) {
      throw error;
    }
  }
  async getSellingById(id_selling: number): Promise<SellingResponse | null> {
    try {
      return await this.sellingRepository.getSellingById(id_selling);
    } catch (error) {
      throw error;
    }
  }
  async getAllSelling(): Promise<SellingResponse[]> {
    try {
      return await this.sellingRepository.getAllSelling();
    } catch (error) {
      throw error;
    }
  }
}
