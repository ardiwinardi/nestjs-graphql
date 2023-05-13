import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel({
      name: createUserInput.name,
      email: createUserInput.email,
      createdAt: new Date(),
    });
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const item = await this.userModel.findByIdAndUpdate(id, {
      name: updateUserInput.name,
      email: updateUserInput.email,
      updatedAt: new Date(),
    });

    if (!item) throw new NotFoundException();
    return item;
  }

  async remove(id: string): Promise<User> {
    const item = await this.userModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
