import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataProcessorService {
  private readonly logger = new Logger(DataProcessorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
     private readonly configService: ConfigService,
  ) {}

 // xử lý dữ liệu từ mqtt
  async processDataFromMqtt(data: { temperature: number; humidity: number; gardenId: number }) {
    const { temperature, humidity, gardenId } = data;
  
    // Kiểm tra dữ liệu hợp lệ
    if (!temperature || !humidity || !gardenId) {
      this.logger.warn('Dữ liệu không hợp lệ:', data);
      return { message: 'Invalid data format', received: data };
    }
  
    try {
      // Lưu dữ liệu vào CSDL
      const savedData = await this.prisma.sensorData.create({
        data: {
          temperature,
          humidity,
          gardenId,
        },
      });
  
      this.logger.log('Dữ liệu đã được lưu:', savedData);
      return { message: 'Data processed and saved', savedData };
    } catch (error) {
      this.logger.error('Lỗi khi lưu dữ liệu:', error.message);
      throw new Error('Data processing error');
    }
  }

  // xử lý dữ liệu từ websocket
  async processDataFromWebsocket(payload: { token: string; gardenId: number; data: any }) {
  const { token, gardenId, data } = payload;

  // Xác thực token và lấy thông tin người dùng
  const user = await this.validateToken(token);

  // Kiểm tra quyền truy cập vào gardenId
  const hasAccess = await this.checkGardenAccess(user.id, gardenId);
  if (!hasAccess) {
    throw new UnauthorizedException('Access denied to this garden');
  }

  console.log('Processing data from WebSocket:', data);

  const processedData = {
    gardenId,
    timestamp: new Date(),
    user,
  };

  console.log('Processed data:', processedData);
  return processedData;
}

  // kiểm tra token
  async validateToken(token: string): Promise<{ id: number; email: string; role: string }> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwtService.verify(token, { secret });

      // Kiểm tra payload có chứa sub hoặc id
      if (!payload.sub && !payload.id) {
        throw new UnauthorizedException('Invalid token: Missing user ID');
      }

      // Ánh xạ sub thành id
      return {
        id: payload.sub || payload.id,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      console.warn('Token validation failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  // kiểm tra quyền 
  async checkGardenAccess(userId: number, gardenId: number): Promise<boolean> {
    // Kiểm tra userId hợp lệ
    if (!userId) {
      console.warn('Invalid userId:', userId);
      throw new UnauthorizedException('Invalid user ID');
    }

    const garden = await this.prisma.garden.findFirst({
      where: {
        id: gardenId,
        userId,
      },
    });

    console.log('Garden check:', { userId, gardenId, garden });
    return !!garden;
  }
}
