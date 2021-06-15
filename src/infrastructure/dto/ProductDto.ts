import { Product } from '../../domain/products/Product'

export class ProductDto {

    public constructor(product: Product) {
        this.name = product.name
        this.description = product.description
        this.category = product.category
        this.price = product.price
        this.details = product.details
    }

    public readonly name: string;
    public readonly description: string;
    public readonly category: string;
    public readonly price: number;
    public readonly details: Record<string, string>;
}