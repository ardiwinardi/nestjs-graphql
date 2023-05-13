import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const createdCategory = new this.categoryModel({
      name: createCategoryInput.name,
      createdAt: new Date(),
    });
    return createdCategory.save();
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const item = await this.categoryModel.findByIdAndUpdate(id, {
      name: updateCategoryInput.name,
      updatedAt: new Date(),
    });

    if (!item) throw new NotFoundException();
    return item;
  }

  async remove(id: string) {
    const item = await this.categoryModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
