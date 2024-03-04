import { Material } from "./material";
import { QualityProduct } from "./qualityProduct";
import { Service } from "./service";
import { StatusOrder } from "./statusOrder";

export interface OrderProduct {


    id: number;
        materials: Material;
        qualityProducts: QualityProduct;
        statusOrders: StatusOrder;
        services: Service;
    }
    
   
    