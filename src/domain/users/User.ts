export class User {

    public constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    public readonly id: number
    public readonly name: string
}