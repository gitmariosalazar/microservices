import { ReturnRequest } from '../../domain/schemas/dto/request/return.request';
import { ReturnResponse } from '../../domain/schemas/dto/response/return.response';
import { ReturnModel } from '../../domain/schemas/model/return.model';

export class ReturnMapper {
  static toResponse(returns: any): ReturnResponse {
    return {
      id_return: returns.id_return,
      reason: returns.reason,
      return_date: returns.return_date,
      status: returns.status,
      selling: {
        id_selling: returns.selling.id_selling,
        selling_code: returns.selling.selling_code,
        id_user: returns.selling.id_user,
        sub_total: returns.selling.subtotal,
        total: returns.selling.total,
        iva: returns.selling.iva,
        status: returns.selling.status,
        selling_date: returns.selling.selling_date,
        selling_items: returns.selling.selling_items.map((item: any) => {
          return {
            id_selling_item: item.id_selling_item,
            id_selling: item.id_selling,
            id_product: item.id_product,
            quantity: item.quantity,
            iva: item.iva,
            sub_total: item.subtotal,
            total_price: item.total_price,
            unit_price: item.unit_price,
          };
        }),
      },
    };
  }

  static toModel(returnRequest: ReturnRequest): ReturnModel {
    return {
      reason: returnRequest.reason,
      return_date: new Date(),
      status: 'pending',
      id_selling: returnRequest.id_selling,
    };
  }
}
