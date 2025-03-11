import { ReturnRequest } from '../../domain/schemas/dto/request/return.request';
import { ReturnResponse } from '../../domain/schemas/dto/response/return.response';
import { ReturnModel } from '../../domain/schemas/model/return.model';

export interface InterfaceReturnUseCaseService {
  createReturn(returnRequest: ReturnRequest): Promise<ReturnResponse | null>;
  getReturnById(id_return: number): Promise<ReturnResponse | null>;
  getReturns(): Promise<ReturnResponse[]>;
  updateReturn(
    id_return: number,
    returnRequest: ReturnRequest,
  ): Promise<ReturnResponse | null>;
  deleteReturn(id_return: number): Promise<boolean>;
}
