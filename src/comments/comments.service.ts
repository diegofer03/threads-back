import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const createComment = this.commentModel.create({
      text: createCommentDto.text,
      user: createCommentDto.userId,
      parent: createCommentDto.parentId || null,
    });
    return await createComment.then((doc) => {
      return doc.populate(['user', 'parent']);
    });
  }

  async findAll() {
    return await this.commentModel.find().populate(['user', 'parent']).exec();
  }

  async findTopLevelComments() {
    return await this.commentModel
      .find({
        parent: null,
      })
      .populate(['user'])
      .exec();
  }

  async findComementsByParentId(id: string) {
    return await this.commentModel
      .find({
        parent: id,
      })
      .populate(['user'])
      .exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment ${updateCommentDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
