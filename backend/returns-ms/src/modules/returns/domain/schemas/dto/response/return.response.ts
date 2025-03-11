import { SellingResponse } from './selling.response';
export interface ReturnResponse {
  id_return?: number;
  reason: string;
  return_date: Date;
  status: string;
  selling: SellingResponse;
}
