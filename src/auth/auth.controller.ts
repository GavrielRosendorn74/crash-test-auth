import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign_up.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authservice : AuthService
  ) {}

  @Post('sign_up')
  signUp(@Body() dto : SignUpDto) {
    return this.authservice.signUp(dto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  logIn(@Req() req) {
    return this.authservice.logIn(req.user);
  }

  @Get('is_connected')
  @UseGuards(JwtGuard)
  isConnected() {
    return {
      status: 'CONNECTED'
    };
  }
}
