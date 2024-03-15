import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'alex martinez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'd1239876' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'alex99' })
  @IsString()
  @IsNotEmpty()
  userName: string;
}
