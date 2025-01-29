import { forwardRef } from '@nestjs/common';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  title: String;
  @Field(() => String)
  description: String;
  @Field(() => String)
  status: String;
}
