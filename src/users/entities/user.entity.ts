import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: '35' })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: '35' })
  lastName: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar' })
  password: string;
}
