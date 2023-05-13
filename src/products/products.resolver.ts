import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsQuery } from './dto/products.query';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsService } from './products.service';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation('createProduct')
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query('products')
  async findAll(@Args('productsQuery') productsQuery: ProductsQuery) {
    const result = await this.productsService.findAll(productsQuery);
    return result;
  }

  @Query('productsCount')
  countAll() {
    return this.productsService.countAll();
  }

  @Query('product')
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation('updateProduct')
  update(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation('removeProduct')
  remove(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
