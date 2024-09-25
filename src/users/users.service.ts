import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {

    private readonly users: UserDto[] = [
        {
            id: "1",
            username: "teste",
            password: "123456"
        }
    ]

    create(newUser: UserDto) {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 10);
        this.users.push(newUser);
    }

    findByUsername(username: string): UserDto | null {
        return this.users.find(user => user.username === username);
    }
}
