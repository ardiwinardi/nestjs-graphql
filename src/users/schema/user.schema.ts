import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
