import { Inject, Injectable } from '@nestjs/common';
import { InterfaceReturnUseCaseService } from '../usecases/return.use-case.interface';
import { ReturnRepositoryInterface } from '../../domain/contracts/return.repository.interface';
import { ReturnResponse } from '../../domain/schemas/dto/response/return.response';
import { ReturnModel } from '../../domain/schemas/model/return.model';
import { ReturnRequest } from '../../domain/schemas/dto/request/return.request';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class ReturnUseCaseService implements InterfaceReturnUseCaseService {
  constructor(
    @Inject('ReturnRepository')
    private readonly returnRepository: ReturnRepositoryInterface,
  ) {}
  async createReturn(
    returnRequest: ReturnRequest,
  ): Promise<ReturnResponse | null> {
    try {
      return await this.returnRepository.createReturn(
        ReturnMapper.toModel(returnRequest),
      );
    } catch (error) {
      throw error;
    }
  }
  async getReturnById(id_return: number): Promise<ReturnResponse | null> {
    try {
      return await this.returnRepository.getReturnById(id_return);
    } catch (error) {
      throw error;
    }
  }
  async getReturns(): Promise<ReturnResponse[]> {
    try {
      return await this.returnRepository.getReturns();
    } catch (error) {
      throw error;
    }
  }
  async updateReturn(
    id_return: number,
    returnRequest: ReturnRequest,
  ): Promise<ReturnResponse | null> {
    try {
      return await this.returnRepository.updateReturn(
        id_return,
        ReturnMapper.toModel(returnRequest),
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteReturn(id_return: number): Promise<boolean> {
    try {
      return await this.returnRepository.deleteReturn(id_return);
    } catch (error) {
      throw error;
    }
  }
}
