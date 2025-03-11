import { SellingItemsResponse } from './selling-items.response';

export interface SellingResponse {
  id_selling?: number;
  selling_code?: string;
  id_user: number;
  sub_total: number;
  total: number;
  iva: number;
  status: string;
  selling_date: Date;
  selling_items: SellingItemsResponse[];
}
