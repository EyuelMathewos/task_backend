import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  status: string;
}
