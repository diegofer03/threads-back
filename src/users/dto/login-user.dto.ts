import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'alex@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'd1234890' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
