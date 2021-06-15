export class Product {

    public constructor(
        public readonly id: number,
        public readonly description: string,
        public readonly price: number,
        public readonly category: string,
        public readonly name: string,
        public readonly details: Record<string, string>
    ) { }
}