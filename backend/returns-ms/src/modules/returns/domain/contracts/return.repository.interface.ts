import { ReturnResponse } from '../schemas/dto/response/return.response';
import { ReturnModel } from '../schemas/model/return.model';

export interface ReturnRepositoryInterface {
  createReturn(returnModel: ReturnModel): Promise<ReturnResponse | null>;
  getReturnById(id_return: number): Promise<ReturnResponse | null>;
  getReturns(): Promise<ReturnResponse[]>;
  updateReturn(
    id_return: number,
    returnModel: ReturnModel,
  ): Promise<ReturnResponse | null>;
  deleteReturn(id_return: number): Promise<boolean>;
}
