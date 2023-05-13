import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/schema/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  categories: Category[];
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const productSchema = SchemaFactory.createForClass(Product);
