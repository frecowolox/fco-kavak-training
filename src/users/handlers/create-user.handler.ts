import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private usersService: UsersService) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { createUserInput } = command;

    const createdUser = await this.usersService.createUser(createUserInput);
    return createdUser;
  }
}
