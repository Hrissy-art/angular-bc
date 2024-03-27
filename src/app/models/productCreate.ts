export interface Prod {
  id?: number;
  productName: string;
  price: number;
  category?: {
    '@id'?: string;
    id?: number;
    category_name?: string;
  };
  description: string;
  productImg: string;
}
