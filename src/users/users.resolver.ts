import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private commandBus: CommandBus,
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.commandBus.execute(new CreateUserCommand(createUserInput));
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
