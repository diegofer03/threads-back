import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post('getByUsername')
  async findByUsername(@Body() body: any) {
    try {
      return await this.usersService.findByUsername(body.userName);
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @ApiBody({ type: [CreateUserDto] })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: new Error(error.message),
      });
    }
  }
}
