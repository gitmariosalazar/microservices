export interface ProductModel {
  id_product?: number;
  code: string;
  name: string;
  description?: string;
  quantity: number;
  iva: number;
  mark: string;
  percentage_increment: number;
  public_price?: number;
  supplier_price: number;
}
