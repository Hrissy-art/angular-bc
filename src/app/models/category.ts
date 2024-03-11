import { Product } from '../models/products'; // Assurez-vous d'avoir l'interface Product définie

export interface Category {
  id: any;
  category_name: any;
  parent?: any;
  children: any;
  products: any;
}
