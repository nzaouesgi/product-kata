import { Product } from '../../domain/products/Product';
import { IProductRepository } from '../../domain/products/ports/IProductRepository';
import { range } from '../../utils'
import faker from 'faker'
import Optional from 'optional-js'
import Chance from 'chance'
import moment from 'moment'

const chance = new Chance()

export class ProductRepositoryMemory implements IProductRepository {

    private readonly products: Product[];

    public constructor (products?: Product[]) {
        
        if (products !== undefined) {
            this.products = products!;
        } else {
            this.products = range(10).map(i => new Product(
                i,
                faker.lorem.words(100),
                100,
                faker.lorem.words(1),
                faker.lorem.words(1),
                Object.fromEntries(
                    range(10).map(() => [faker.lorem.words(1), faker.lorem.words(1)])
                ),
            ))
        }
    }

    public getById(id: number): Optional<Product> {
        return Optional.ofNullable(this.products.find(product => product.id === id) || null)
    }
}