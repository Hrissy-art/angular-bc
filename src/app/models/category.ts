import { Product } from '../models/products'; // Assurez-vous d'avoir l'interface Product définie

export interface Category {
  '@id'?: string | null;
  id: any;
  category_name: any;
  parent?: any;
  children: any;
  products: any;
}
