import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@UseGuards(JwtAuthGuard)
@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('createCategory')
  create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query('categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Mutation('updateCategory')
  update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
