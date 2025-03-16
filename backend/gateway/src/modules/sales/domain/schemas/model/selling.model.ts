import { UUID } from 'crypto';
import { SellingItemsModel } from './selling-items.model';

export interface SellingModel {
  id_selling?: number;
  selling_code?: UUID;
  id_user: number;
  sub_total: number;
  total: number;
  iva: number;
  status: string;
  selling_date: Date;
  selling_items: SellingItemsModel[];
}
