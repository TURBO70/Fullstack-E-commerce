// import { Order, OrderItem } from "../../shared/models/order_model";

// export function createNewOrder(userId: number, items: OrderItem[]): Order {
//     // const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
//     let totalPrice = 0;
//     for(let i=0; i<items.length; i++) {
//         totalPrice += items[i].price * items[i].quantity;
//     }
//     return {
//         userId,
//         items,
//         totalPrice,
//         status: 'pending',
//         createdAt: new Date().toString(),
//     };
// }