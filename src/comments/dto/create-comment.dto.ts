import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'text comment example' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '${userId}' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '${parentId}?' })
  parentId: string | null;

  likes: number | null;
}
