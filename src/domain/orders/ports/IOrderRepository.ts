import { Order } from "../Order"

export interface IOrderRepository {
    getByUserId(userId: number): Order[]
}