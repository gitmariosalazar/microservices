export class SellingMapper {
  static toResponse(selling: any) {
    return {
      id_selling: selling.id_selling,
      selling_code: selling.selling_code,
      id_user: selling.id_user,
      sub_total: selling.subtotal,
      total: selling.total,
      iva: selling.iva,
      status: selling.status,
      selling_date: selling.selling_date,
      selling_items: selling.selling_items.map((item: any) => {
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
    };
  }
  static toModel(selling: any) {
    return {
      id_selling: selling.id_selling,
      selling_code: selling.selling_code,
      id_user: selling.id_user,
      sub_total: selling.subtotal,
      total: selling.total,
      iva: selling.iva,
      status: selling.status,
      selling_date: selling.selling_date,
      selling_items: selling.selling_items.map((item: any) => {
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
    };
  }
}
