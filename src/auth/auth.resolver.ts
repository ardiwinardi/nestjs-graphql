import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/schema/user.schema';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  login(@Args('loginInput') loginIput: LoginInput) {
    return this.authService.login(loginIput);
  }

  @Query()
  @UseGuards(AuthGuard)
  me(@Context('user') user: User) {
    console.log(user);
    return user;
  }
}
