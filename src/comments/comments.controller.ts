import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // BadRequestException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commentsService.create(createCommentDto);
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Get()
  // @UseFilters(new AllExceptionsFilter())
  async findAll(@Query() queryParams) {
    try {
      if (queryParams.parentId)
        return await this.commentsService.findComementsByParentId(
          queryParams.parentId,
        );
      return await this.commentsService.findTopLevelComments();
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
