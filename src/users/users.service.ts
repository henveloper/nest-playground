import { Injectable } from '@nestjs/common';

type User = {
    name: string;
    pw: string;
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        { name: "Ben", pw: "123" },
        { name: "Pen", pw: "69" },
    ]
    async findOne(userName: string) {
        return this.users.find(u => u.name === userName);
    }
}
