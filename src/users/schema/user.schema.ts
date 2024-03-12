import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  autoCreate: true,
  autoIndex: true,
})
export class User {
  @Prop({ required: true, maxlength: 50 })
  name: string;

  @Prop({ required: true, maxlength: 50, unique: true })
  email: string;

  @Prop({ required: true, maxlength: 250 })
  password: string;

  @Prop({ required: true, maxlength: 50, unique: true })
  userName: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret['password'];
    return ret;
  },
});

export default UserSchema;
