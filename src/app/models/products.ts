import { Service } from './service';

export interface Product {
  id: number;
  product_name: string;
  price: number;
  category: {
    id: number;
    category_name: string;
  };
  services: Service[];
  order_product: {
    quantity: number; // Quantité de ce produit dans la commande
  };
}
