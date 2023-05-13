import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const categorySchema = SchemaFactory.createForClass(Category);
