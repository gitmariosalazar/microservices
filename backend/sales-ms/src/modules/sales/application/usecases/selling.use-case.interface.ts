import { SellingRequest } from '../../domain/schemas/dto/request/selling.request';
import { SellingAmountResponse } from '../../domain/schemas/dto/response/selling.amount.response';
import { SellingResponse } from '../../domain/schemas/dto/response/selling.response';

export interface InterfaceSellingUseCaseService {
  createSelling(selling: SellingRequest): Promise<SellingResponse | null>;
  updateSelling(
    selling: SellingRequest,
    id_selling: number,
  ): Promise<SellingResponse | null>;
  deleteSelling(id_selling: number): Promise<boolean>;
  getSellingById(id_selling: number): Promise<SellingResponse | null>;
  getAllSelling(): Promise<SellingResponse[]>;
  findGreaterSelling(): Promise<SellingResponse | null>;
  findLessSelling(): Promise<SellingResponse | null>;
  findSellingByDate(date: Date): Promise<SellingResponse[]>;
  findAmountSellingByDate(date: Date): Promise<SellingAmountResponse | null>;
}
