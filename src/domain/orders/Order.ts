export class Order {

    public constructor(
        public readonly id: number,
        public readonly idUser: number,
        public readonly idProduct: number,
        public readonly date: Date
    ) { }
}