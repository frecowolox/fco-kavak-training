import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './handlers/create-user.handler';

const commandHandlers = [CreateUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [UsersResolver, UsersService, ...commandHandlers],
})
export class UsersModule {}
