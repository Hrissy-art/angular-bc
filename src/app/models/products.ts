import { Orderproduct } from "./orderProduct";

export interface Product {
     id: number,
    product_name: string,
    price: number,
    category: string,
    // orderProducts: Orderproduct[],
    productName: string
}