import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { User } from './schema/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, ConfigService, JwtService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
