import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotAcceptableException,
  // NotFoundException,
  // HttpCode,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcrypt';
// import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
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

  // @Post('findByEmail')
  // @HttpCode(200)
  // async findByEmail(@Body() loginUserDto: LoginUserDto) {
  //   try {
  //     const user = await this.usersService.findByEmail(loginUserDto.email);
  //     const login = await bcrypt.compare(loginUserDto.password, user.password);
  //     user.password = undefined;
  //     if (login) return user;
  //     else
  //       throw new HttpException(
  //         'User or password invalid',
  //         HttpStatus.UNAUTHORIZED,
  //       );
  //   } catch (error) {
  //     throw new NotFoundException(error.message, {
  //       cause: new Error(error.message),
  //     });
  //   }
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
