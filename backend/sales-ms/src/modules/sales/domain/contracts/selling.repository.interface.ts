import { SellingAmountResponse } from '../schemas/dto/response/selling.amount.response';
import { SellingResponse } from '../schemas/dto/response/selling.response';
import { SellingModel } from '../schemas/model/selling.model';

export interface InterfaceSellingRepository {
  createSelling(selling: SellingModel): Promise<SellingResponse | null>;
  updateSelling(
    selling: SellingModel,
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
