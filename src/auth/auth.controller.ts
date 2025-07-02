import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '../user//dto/create-user.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() CreateLoginDto: CreateLoginDto) {
    return this.authService.login(CreateLoginDto);
  }
}
