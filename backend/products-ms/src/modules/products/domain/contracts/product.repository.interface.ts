import { ProductResponse } from '../schemas/dto/response/product.response';
import { ProductModel } from '../schemas/model/product.model';

export interface ProductRepositoryInterface {
  createProduct(product: ProductModel): Promise<ProductResponse | null>;
  updateProduct(
    product: ProductModel,
    code: string,
  ): Promise<ProductResponse | null>;
  deleteProduct(code: string): Promise<boolean>;
  getProductByCode(code: string): Promise<ProductResponse | null>;
  getProducts(): Promise<ProductResponse[]>;
  findUnpurshasedProducts(): Promise<ProductResponse[]>;
  findPurchasedProducts(): Promise<ProductResponse[]>;
  findWarningStockProducts(): Promise<ProductResponse[]>;
}
