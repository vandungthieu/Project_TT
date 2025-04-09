import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)

        res.on('finish', ()=>{
            if(res.statusCode >= 400 ){
                console.error(`ERROR: ${req.method} ${req.url} - Status: ${res.statusCode}`)
            }
        })

        next()
    }
}