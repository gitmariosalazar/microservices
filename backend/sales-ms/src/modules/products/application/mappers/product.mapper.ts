import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../domain/schemas/model/product.model';

export class ProductMapper {
  static toResponse(product: ProductModel): ProductResponse {
    return {
      code: product.code,
      description: product.description,
      iva: product.iva,
      mark: product.mark,
      name: product.name,
      percentage_increment: product.percentage_increment,
      public_price: product.public_price,
      quantity: product.quantity,
      supplier_price: product.supplier_price,
    };
  }

  static toModel(product: ProductRequest): ProductModel {
    return {
      code: product.code,
      description: product.description,
      iva: product.iva,
      mark: product.mark,
      name: product.name,
      percentage_increment: 0,
      public_price: 0,
      quantity: product.quantity,
      supplier_price: product.supplier_price,
    };
  }
}
