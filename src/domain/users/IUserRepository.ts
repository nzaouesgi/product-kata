import { User } from './User'
import Optional from 'optional-js'

export interface IUserRepository {
    getById(id: number): Optional<User>
}