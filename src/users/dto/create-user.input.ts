import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'first name of user' })
  name: string;

  @Field(() => String, { description: 'last name of user' })
  lastName: string;

  @Field(() => String, { description: 'email of user' })
  email: string;

  @Field(() => String, { description: 'password of user' })
  password: string;
}
