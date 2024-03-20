// import { OrderProduct } from './orderProduct';
import { OrderProduct } from './orderProduct';
import { StatusOrder } from './statusOrder';
import { User } from './user';

export interface Order {
  id: any;
  dateOrder: Date;
  dateRender: Date;
  orderProducts?: OrderProduct[];
  client: User;
  statusOrder: StatusOrder;
  numberOrder?: number;
}
