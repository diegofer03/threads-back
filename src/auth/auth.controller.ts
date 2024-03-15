import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      user.password = undefined;
      return user;
    } catch (error) {
      if (error.message.includes('duplicate')) {
        throw new NotAcceptableException('email or userName already exists', {
          cause: new Error(error.message),
        });
      } else {
        throw new BadRequestException(error.message, {
          cause: new Error(error.message),
        });
      }
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.usersService.findByEmail(loginUserDto.email);
      const login = await bcrypt.compare(loginUserDto.password, user.password);
      user.password = undefined;
      if (!login)
        throw new HttpException(
          'User or password invalid',
          HttpStatus.UNAUTHORIZED,
        );
      const payload = { sub: user._id, user: user.email };
      const token = await this.jwtService.signAsync(payload);
      return { token, user };
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }
}
