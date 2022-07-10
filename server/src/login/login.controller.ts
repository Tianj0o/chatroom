import { Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  loginGet() {
    return {
      data: 'hello,nest',
    };
  }
  @Post()
  @HttpCode(200)
  login() {
    return {
      code: 200,
      data: {},
      message: '登录成功',
    };
  }
}
