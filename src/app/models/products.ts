import { Service } from './service';

export interface Product {
  id: number;
  product_name: string;
  price: number;
  category?: {
    '@id'?: string;
    id?: number;
    category_name?: string;
  };
  description: string;
  product_img: string;

  services?: Service[];
  // order_product: {
  //   quantity: number;
  // };
}
