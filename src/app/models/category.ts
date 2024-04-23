import { Product } from '../models/products';

export interface Category {
  '@id'?: string | null;
  id: any;
  category_name: any;
  parent?: any;
  children: any;
  products: any;
}
