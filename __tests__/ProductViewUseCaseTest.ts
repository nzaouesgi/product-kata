import { ProductViewUseCase } from '../src/use-cases/ProductViewUseCase'
import { IProductRepository } from '../src/domain/products/ports/IProductRepository'
import { ProductRepositoryMemory } from "../src/infrastructure/adapters/ProductRepositoryMemory"
import { OrderRepositoryMemory } from "../src/infrastructure/adapters/OrderRepositoryMemory"
import { UserRepositoryMemory } from "../src/infrastructure/adapters/UserRepositoryMemory"
import { IUserRepository } from '../src/domain/users/ports/IUserRepository'
import { IOrderRepository } from '../src/domain/orders/ports/IOrderRepository'
import { Product } from '../src/domain/products/Product'
import Chance from 'chance'
import { Order } from '../src/domain/orders/Order'
import { User } from '../src/domain/users/User'
import moment from 'moment'

const chance = new Chance()

describe('ProductViewUseCase', function (){
    let productRepository: IProductRepository
    let productsFixture: Product[]
    let usersFixture: User[]
    let ordersFixture: Order[]
    let userRepository: IUserRepository 
    let ordersRepository: IOrderRepository
    let useCase: ProductViewUseCase

    beforeEach(() => {
        productsFixture = [
            new Product(
                1, "desc", 100, "cat1", 'p1', {'detail': 'ok'}
            ),
            new Product(
                2, "desc", 100, "cat2", 'p2', {'detail': 'ok'}
            ),
            new Product(
                3, "desc", 100, "cat2", 'p3', {'detail': 'ok'}
            ),
            new Product(
                4, "desc", 100, "cat2", 'p4', {'detail': 'ok'}
            )
        ]
        usersFixture = [
            new User(
                1, 'paul'
            ),
            new User(
                2, 'paulita'
            ),
            new User(
                3, 'paulito'
            )
        ]
        ordersFixture = [
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
            new Order(17, 3, 2, moment().subtract(moment.duration(1, 'months')).toDate()),
            new Order(17, 3, 2, moment().subtract(moment.duration(1, 'months')).toDate()),
            new Order(17, 3, 2, moment().subtract(moment.duration(1, 'months')).toDate()),
        ]

        productRepository = new ProductRepositoryMemory(productsFixture)
        userRepository = new UserRepositoryMemory(usersFixture)
        ordersRepository = new OrderRepositoryMemory(ordersFixture)

        useCase = new ProductViewUseCase(
            productRepository, 
            userRepository, 
            ordersRepository
        )
    });

    it('should return a product with full price if not authenticated', () => {

        const product = chance.pickone(productsFixture)

        const viewedProduct = useCase.execute(product.id)

        expect(viewedProduct instanceof Product)
        expect(viewedProduct.id).toBe(product.id)
        expect(viewedProduct.description).toBe(product.description)
        expect(viewedProduct.category).toBe(product.category)
        expect(viewedProduct.details).toEqual({'detail': 'ok'})
        expect(viewedProduct.price).toBe(product.price)
        expect(viewedProduct.name).toBe(product.name)
    })

    it('should return a product with -10% price if 3 previous order of another products in last 6 months', () => {

        const product = productsFixture[0]
        const user = usersFixture[1]

        const viewedProduct = useCase.execute(product.id, user.id)

        expect(viewedProduct instanceof Product)
        expect(viewedProduct.id).toBe(product.id)
        expect(viewedProduct.description).toBe(product.description)
        expect(viewedProduct.category).toBe(product.category)
        expect(viewedProduct.details).toEqual({'detail': 'ok'})
        expect(viewedProduct.price).toBe(product.price * 0.9)
        expect(viewedProduct.name).toBe(product.name)
        
    })

    it('should return a product with +5% price if 6 previous order of current product in last year', () => {

        const user = usersFixture[0]
        const product = productsFixture[0]

        const viewedProduct = useCase.execute(product.id, user.id)

        expect(viewedProduct instanceof Product)
        expect(viewedProduct.id).toBe(product.id)
        expect(viewedProduct.description).toBe(product.description)
        expect(viewedProduct.category).toBe(product.category)
        expect(viewedProduct.details).toEqual({'detail': 'ok'})
        expect(viewedProduct.price).toBe(product.price * 1.05)
        expect(viewedProduct.name).toBe(product.name)
    })

    it('should return a product with -5% price if 6 previous order of current product in last year AND 3 previous order of another products in last 6 months', () => {

        const user = usersFixture[2]
        const product = productsFixture[0]

        const viewedProduct = useCase.execute(product.id, user.id)

        expect(viewedProduct instanceof Product)
        expect(viewedProduct.id).toBe(product.id)
        expect(viewedProduct.description).toBe(product.description)
        expect(viewedProduct.category).toBe(product.category)
        expect(viewedProduct.details).toEqual({'detail': 'ok'})
        expect(viewedProduct.price).toBe(product.price * 0.95)
        expect(viewedProduct.name).toBe(product.name)

    })
})