import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateCatDto } from './dtos/cats.dto';

@Controller('cats')
export class CatsController {
    // https://docs.nestjs.com/controllers#routing
    @Get("response/std")
    @ApiOperation({ summary: "Demonstrate standard response manipulation." })
    private standardResponse() {
        return "CATS!";
    }

    @Get("response/lib")
    @ApiOperation({ summary: "Demonstrate lib-specific response manipulation." })
    private libSpecificResponse(@Res() response: Response) {
        response.status(200).send("CATS!");
    }

    // https://docs.nestjs.com/controllers#request-object
    @Post("requestObject/:id")
    @ApiOperation({ summary: "Demonstrate request obj access." })
    private reqExtraction(
        @Param("id") id: string,
        @Query("qField") qField: string,
    ) {
        return { id, qField };
    }

    // https://docs.nestjs.com/controllers#status-code
    @Get("statusCodeOverride")
    @HttpCode(HttpStatus.I_AM_A_TEAPOT)
    @ApiOperation({ summary: "Demonstrate status code override." })
    private statusCodeOverride() {
        return true;
    }

    // https://docs.nestjs.com/controllers#redirection
    @Get("redirect")
    @Redirect("/cats/statusCodeOverride") // default, can be overriden by controller return
    @ApiOperation({ summary: "Demonstrate redirection." })
    private redirect() { }

    // https://docs.nestjs.com/controllers#redirection
    @Get("dtos")
    @ApiOperation({ summary: "Demonstrate dtos." })
    private dtos(createCatDto: CreateCatDto) {
        return true;
    }
}
