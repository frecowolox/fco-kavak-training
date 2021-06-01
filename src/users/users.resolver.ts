import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  getUsers() {
    return this.usersService.findAllUsers();
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneUser(id);
  }
}
