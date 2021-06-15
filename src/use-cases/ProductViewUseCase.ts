import { IOrderRepository } from '../domain/orders/ports/IOrderRepository'
import { IProductRepository } from '../domain/products/ports/IProductRepository'
import { Product } from '../domain/products/Product'
import { IUserRepository } from '../domain/users/ports/IUserRepository'
import moment from 'moment'
import { Order } from '../domain/orders/Order'

export class ProductNotFoundException extends Error {}
export class UserNotFoundException extends Error {}

export class ProductViewUseCase {

    public constructor(
        private readonly productsRepository: IProductRepository,
        private readonly usersRepository: IUserRepository,
        private readonly ordersRepository: IOrderRepository
    ) { }

    public execute(productId: number, userId?: number): Product {

        const product = this.productsRepository.getById(productId)
            .orElseThrow(() => new ProductNotFoundException("product was not found"))
        
        if (!userId){
            return product
        }
        
        const user = this.usersRepository.getById(userId)
            .orElseThrow(() => new UserNotFoundException("user was not found"))

        const orderHistory = this.ordersRepository.getByUserId(user.id)

        const discounts: [number, (orders: Order[]) => boolean][] = [
            [
                -0.1,
                orders => orders
                    .filter(
                        order =>
                            order.date >= moment().subtract(moment.duration(6, 'months')).toDate() &&
                            order.idProduct !== product.id
                    )
                    .length >= 3
            ],
            [
                0.05,
                orders => orders
                    .filter(
                        order =>
                            order.date >= moment().subtract(moment.duration(1, 'year')).toDate() &&
                            order.idProduct === product.id
                    )
                    .length > 5
            ]
        ]

        const totalDiscount = 1 + discounts.reduce(
            (prev, [value, verifier]) => verifier(orderHistory) ? 
                prev + value : 
                prev, 
            0
        )

        if (totalDiscount === 0){
            return product
        }

        return new Product(
            product.id,
            product.description,
            product.price * totalDiscount,
            product.category,
            product.name,
            product.details
        )
    }

}