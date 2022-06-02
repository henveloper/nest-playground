import { Controller, Get } from '@nestjs/common';

// https://docs.nestjs.com/controllers
@Controller('cats')
export class CatsController {
    @Get()
    private root() {
        return "CATS!";
    }
}
