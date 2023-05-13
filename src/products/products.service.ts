import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsQuery } from './dto/products.query';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    const createdProduct = new this.productModel({
      name: createProductInput.name,
      categories: createProductInput.categories,
      createdAt: new Date(),
    });
    return createdProduct.save();
  }

  findAll(productsQuery: ProductsQuery): Promise<Product[]> {
    const page = productsQuery?.page ?? 1;
    const limit = productsQuery?.limit ?? 10;

    const skip = (page - 1) * limit;
    return this.productModel
      .find()
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  countAll(): Promise<number> {
    return this.productModel.count().exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const item = await this.productModel.findByIdAndUpdate(id, {
      name: updateProductInput.name,
      updatedAt: new Date(),
    });

    if (!item) throw new NotFoundException();
    return item;
  }

  async remove(id: string): Promise<Product> {
    const item = await this.productModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
