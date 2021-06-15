import { Product } from './Product';
import Optional from 'optional-js'

export interface IProductRepository {
    getById(id: number): Optional<Product>;
}