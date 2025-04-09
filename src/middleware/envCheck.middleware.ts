import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class EnvCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const requiredEnvVars = ['DATABASE_URl',]
        const missingVars = requiredEnvVars.filter((envVar)=> !process.env[envVar])
        if(missingVars.length > 0){
            console.error(`Missing environment variable: ${missingVars.join(', ')}`)
            process.exit(1)
        }
        next()
        
    }
}