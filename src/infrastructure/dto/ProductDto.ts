import { Product } from '../../domain/products/Product'

export class ProductDto {

    public constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly category: string,
        public readonly price: number,
        public readonly details: Record<string, string>
    ) {}
}