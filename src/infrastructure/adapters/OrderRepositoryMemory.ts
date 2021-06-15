import { IOrderRepository } from '../../domain/orders/ports/IOrderRepository'
import moment from 'moment'
import { Order } from '../../domain/orders/Order'

export class OrderRepositoryMemory implements IOrderRepository {

    private readonly orders: Order[]

    public constructor (orders?: Order[]) {
        if (orders !== undefined) {
            this.orders = orders!;
        } else {
            this.orders = [
                new Order(0, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
                new Order(1, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
                new Order(2, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
                new Order(3, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
                new Order(4, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
                new Order(5, 1, 1, moment().subtract(moment.duration(9, 'months')).toDate()),
        
                new Order(6, 2, 2, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(7, 2, 3, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(8, 2, 4, moment().subtract(moment.duration(1, 'months')).toDate()),
        
                new Order(12, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(13, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(14, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(15, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(16, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
                new Order(17, 3, 1, moment().subtract(moment.duration(1, 'months')).toDate()),
            ]
        }
    }

    public getByUserId(id: number): Order[] {
        return this.orders.filter(order => order.idUser === id)
    }
}