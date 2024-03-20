import { Material } from './material';
import { Order } from './order';
import { Product } from './products';
// import { QualityProduct } from './qualityProduct';
import { Service } from './service';

export interface OrderProduct {
  orders: Product;
  products: string;
  materials: Material[];
  services: Service[];
  // payment_method: string;
}
