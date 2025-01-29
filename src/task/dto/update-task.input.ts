import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  title?: string;
  @Field(() => String)
  description?: string;
  @Field(() => String)
  status?: string;
}
