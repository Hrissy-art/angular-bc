import { Material } from "./material";
import { QualityProduct } from "./qualityProduct";
import { Service } from "./service";
import { StatusOrder } from "./statusOrder";

export interface OrderProduct {


    id: number;
        material: Material;
        qualityProduct: QualityProduct;
        statusOrder: StatusOrder;
        service: Service;
    }
    
   
    