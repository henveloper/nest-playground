import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
        // pass
    }

    public issueJwt(payload: Record<string, any>) {
        return this.jwtService.sign(
            payload, { secret: "plm" });
    }

    public validateJwt(token: string) {
        return this.jwtService.verify(token, { secret: "plm" });
    }

    public async validateUserPw(username: string, pw: string) {
        const user = await this.usersService.findOne(username);
        if (user?.pw === pw) {
            return { name: user.name };
        }
        return null;
    }


}
