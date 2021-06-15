import { User } from '../../domain/users/User';
import { IUserRepository } from '../../domain/users/ports/IUserRepository';
import { range } from '../../utils'
import faker from 'faker'
import Optional from 'optional-js'

export class UserRepositoryMemory implements IUserRepository {
    private readonly users: User[]

    public constructor (users?: User[]) {
        if (users !== undefined) {
            this.users = users!;
        } else {
            this.users = range(10).map(i => new User(
                i,
                faker.lorem.words(1)
            ))
        }
    }

    public getById(id: number): Optional<User> {
        return Optional.ofNullable(this.users.find(user => user.id === id) || null)
    }
}