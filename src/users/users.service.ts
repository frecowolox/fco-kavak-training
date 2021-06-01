import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

const loggerPath = 'service::user::';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string) {
    try {
      const foundUser = await User.findOne({ where: { email } });
      return foundUser;
    } catch (error) {
      Logger.error(`${loggerPath}findByEmail - error: ${error.message}`);
      throw new InternalServerErrorException('database error in findByEmail');
    }
  }

  async createUser(createUserInput: CreateUserInput) {
    try {
      const foundUser = await this.findUserByEmail(createUserInput.email);

      if (foundUser) throw new BadRequestException('email already exists');

      const createdUser = User.create(createUserInput);
      await createdUser.save();
      return createdUser;
    } catch (error) {
      Logger.error(`${loggerPath}createUser - error: ${error.message}`);
      throw error;
    }
  }

  async findAllUsers() {
    const users = await User.find();
    return users;
  }

  async findOneUser(id: string) {
    const user = await User.findOne({ where: { id } });

    if (!user) throw new NotFoundException('user does not exist');

    return user;
  }
}
