import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('OwnershipGuard is running for endpoint:', context.getHandler().name);
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy user từ request (được gắn bởi JwtAuthGuard)

    // Nếu không có user (do JwtAuthGuard thất bại), trả về false
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Nếu user là admin, cho phép truy cập mọi tài nguyên
    if (user.role === 'admin') {
      return true;
    }

    // Lấy userId từ params (nếu có, ví dụ: /gardens/:id)
    const resourceUserId = request.params.id || request.params.userId;

    // Nếu endpoint không yêu cầu resourceUserId (như tạo garden mới), cho phép
    if (!resourceUserId) {
      return true;
    }

    // Kiểm tra quyền sở hữu: so sánh user.id từ token với resourceUserId
    if (user.id !== Number(resourceUserId)) {
      throw new ForbiddenException('You are not authorized to access this resource');
    }

    return true;
  }
}