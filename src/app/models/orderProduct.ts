import { Material } from './material';
import { Order } from './order';
import { Product } from './products';
import { Service } from './service';

export interface OrderProduct {
  id?: any;
  orders: string;
  products: Product;
  materials: Material[];
  services: Service[];
  // payment_method: string;
}
