import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class OwnershipGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const user = request.user // lấy user từ request
        const userId = request.params.id || request.body.ownerId 

        if(user.role === 'admin'){
            return true
        }

        if(user.id !== Number(userId)){
            throw new ForbiddenException('You are not authorired to access  this resouce')
        }

        return true
    }
}