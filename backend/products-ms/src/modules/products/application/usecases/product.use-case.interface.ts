import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';

export interface InterfaceProductUseCaseService {
  createProduct(product: ProductRequest): Promise<ProductResponse | null>;
  updateProduct(
    product: ProductRequest,
    code: string,
  ): Promise<ProductResponse | null>;
  deleteProduct(code: string): Promise<boolean>;
  getProductByCode(code: string): Promise<ProductResponse | null>;
  getProducts(): Promise<ProductResponse[]>;
  findUnpurshasedProducts(): Promise<ProductResponse[]>;
  findPurchasedProducts(): Promise<ProductResponse[]>;
  findWarningStockProducts(): Promise<ProductResponse[]>;
}
