import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers || !request.headers.authorization) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token = this.authService.extractTokenFromHeader(
      request.headers.authorization,
    );
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payload = await this.authService.validateToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', error);
    }
  }
}
