import { Controller, Get, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  login() {
    return {
      data: 'hello,nest',
    };
  }
}
