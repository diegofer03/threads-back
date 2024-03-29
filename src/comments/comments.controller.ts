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
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
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
  @ApiQuery({ name: 'parentId', required: false, type: 'string' })
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
  async findOne(@Param('id') id: string) {
    try {
      return await this.commentsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Get('getTopByUserId/:id')
  async findByUserId(@Param('id') id: string) {
    try {
      return await this.commentsService.findTopByUserId(id);
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Get('getRepliesByUserId/:id')
  async findRepliesByUserId(@Param('id') id: string) {
    try {
      return await this.commentsService.findRepliesByUserId(id);
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @ApiBody({ type: [CreateCommentDto] })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    try {
      return await this.commentsService.update(id, updateCommentDto);
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commentsService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: new Error(error.message),
      });
    }
  }
}
