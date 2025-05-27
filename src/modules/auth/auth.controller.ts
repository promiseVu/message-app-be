import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() data: any) {
    return await this.authService.login(data.email, data.password);
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  async verify(@Headers('Authorization') authorization: string) {
    const token = this.authService.extractTokenFromHeader(authorization);
    return await this.authService.validateToken(token);
  }
}
