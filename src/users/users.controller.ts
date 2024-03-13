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
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Post('findByEmail')
  @HttpCode(200)
  async findByEmail(@Body() email: object) {
    try {
      const user = await this.usersService.findByEmail(email);
      return user;
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

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
