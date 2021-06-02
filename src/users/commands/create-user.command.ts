import { CreateUserInput } from '../dto/create-user.input';

export class CreateUserCommand {
  constructor(public readonly createUserInput: CreateUserInput) {}
}
