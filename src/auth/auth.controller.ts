import { Controller, Get, Headers, InternalServerErrorException, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
        // pass
    }

    @UseGuards(AuthGuard("local"))
    @ApiQuery({ name: "username", example: "Ben" })
    @ApiQuery({ name: "password", example: "123" })
    @Get("local")
    async local(
        @Req() request: Request
    ) {
        const user = request.user as { name: string };
        const token = this.authService.issueJwt(user);
        return { token, user };
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("jwt")
    async jwt(
        @Req() request: Request,
    ) {
        const { user } = request;
        return request.user;
    }
}
