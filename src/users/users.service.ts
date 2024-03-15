import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;
    const userSave = new this.userModel(createUserDto);
    return await userSave.save();
  }

  async findByEmail(email: string) {
    const users = await this.userModel
      .findOne({ email: email })
      .select(['+password'])
      .exec();
    return users;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
